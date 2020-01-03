import React, { Component } from 'react';
import { compose } from 'recompose';

import { withTheme } from 'styled-components';

import { defaultProps } from '../../default-props';

import { Box } from '../Box';
import { Button } from '../Button';
import { Heading } from '../Heading';
import { Keyboard } from '../Keyboard';

import {
  StyledCalendar,
  StyledDay,
  StyledDayContainer,
  StyledWeek,
  StyledWeeks,
  StyledWeeksContainer,
} from './StyledCalendar';
import {
  addDays,
  addMonths,
  betweenDates,
  daysApart,
  endOfMonth,
  startOfMonth,
  subtractDays,
  subtractMonths,
  withinDates,
  updateDateRange,
} from './utils';

const headingPadMap = {
  small: 'xsmall',
  medium: 'small',
  large: 'medium',
};

const buildStartEnd = (reference, firstDayOfWeek) => {
  let start = new Date(reference);
  start.setDate(1); // first of month

  // In case Sunday is the first day of the month, and the user asked for Monday
  // to be the first day of the week, then we need to include Sunday and six
  // days prior.
  start =
    start.getDay() === 0 && firstDayOfWeek === 1
      ? (start = subtractDays(start, 6))
      : // beginning of week
        (start = subtractDays(start, start.getDay() - firstDayOfWeek));

  const end = addDays(start, 7 * 5 + 7); // 5 weeks to end of week
  return { start, end };
};

const buildState = props => {
  const { date, dates, firstDayOfWeek, reference } = props;
  let normalizedReference;
  if (reference) {
    normalizedReference = new Date(reference);
  } else if (date) {
    normalizedReference = new Date(date);
  } else if (dates && dates.length > 0) {
    if (typeof dates[0] === 'string') {
      normalizedReference = new Date(dates[0]);
    } else if (Array.isArray(dates[0])) {
      normalizedReference = new Date(dates[0][0]);
    } else {
      normalizedReference = new Date();
    }
  } else {
    normalizedReference = new Date();
  }
  return {
    ...buildStartEnd(normalizedReference, firstDayOfWeek),
    reference: normalizedReference,
  };
};

class Calendar extends Component {
  static defaultProps = {
    animate: true,
    firstDayOfWeek: 0,
    size: 'medium',
    locale: 'en-US',
    showAdjacentDays: true,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { reference } = nextProps;
    const { reference: prevReference } = prevState;
    if (
      Object.prototype.hasOwnProperty.call(nextProps, 'date') ||
      Object.prototype.hasOwnProperty.call(nextProps, 'dates') ||
      !prevReference ||
      reference
    ) {
      let state = {};
      if (
        Object.prototype.hasOwnProperty.call(nextProps, 'date') ||
        Object.prototype.hasOwnProperty.call(nextProps, 'dates')
      ) {
        state.date = nextProps.date;
        state.dates = nextProps.dates;
      }
      if (!prevReference || reference) {
        state = { ...state, ...buildState(nextProps) };
      }
      return state;
    }
    return null;
  }

  state = {
    focusOnCalendar: false,
  };

  dayRefs = {};

  componentDidUpdate() {
    const { focused } = this.state;
    if (focused) {
      const ref = this.dayRefs[focused.toISOString()];
      if (ref && ref.current && ref.current !== document.activeElement) {
        ref.current.focus();
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  clearSlideStateLater = () => {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      const { targetStartEnd } = this.state;
      if (targetStartEnd) {
        this.setState({
          start: targetStartEnd.start,
          end: targetStartEnd.end,
          targetStartEnd: undefined,
          slide: undefined,
        });
      }
      // Wait for animation to finish before cleaning up.
      // Empirically determined.
    }, 800);
  };

  setReference = reference => {
    const { animate, bounds, firstDayOfWeek, onReference } = this.props;
    const { start, end, targetStartEnd } = this.state;
    if (betweenDates(reference, bounds)) {
      const nextStartEnd = buildStartEnd(reference, firstDayOfWeek);
      const nextState = { reference };
      // if we're changing too fast, bypass animation
      if (!animate || targetStartEnd) {
        nextState.targetStartEnd = nextStartEnd;
        nextState.start = nextStartEnd.start;
        nextState.end = nextStartEnd.end;
        nextState.targetStartEnd = undefined;
        nextState.slide = undefined;
      } else {
        nextState.targetStartEnd = nextStartEnd;
        if (nextStartEnd.start.getTime() < start.getTime()) {
          nextState.start = nextStartEnd.start;
          nextState.slide = {
            direction: 'down',
            weeks: daysApart(start, nextStartEnd.start) / 7,
          };
        } else if (nextStartEnd.end.getTime() > end.getTime()) {
          nextState.end = nextStartEnd.end;
          nextState.slide = {
            direction: 'up',
            weeks: daysApart(nextStartEnd.end, end) / 7,
          };
        }
      }
      this.clearSlideStateLater();
      this.setState(nextState, () => {
        if (onReference) {
          onReference(reference.toISOString());
        }
      });
    }
  };

  onFocus = day => () => {
    const { bounds } = this.props;
    const { reference } = this.state;
    this.setState({ focusOnCalendar: true });
    if (betweenDates(day, bounds)) {
      this.setState({ focused: day }, () => {
        if (day.getMonth() !== reference.getMonth()) {
          this.setReference(day);
        }
      });
    }
  };

  onClickDay = dateString => () => {
    const { onSelect, range } = this.props;
    if (range) {
      const nextState = updateDateRange(dateString, this.state);
      this.setState(nextState);
      if (onSelect) {
        onSelect(nextState.dates || nextState.date || undefined);
      }
    } else if (onSelect) {
      onSelect(dateString);
    }
  };

  setFocus = day => {
    const ref = this.dayRefs[day.toISOString()];
    if (ref && ref.current) {
      ref.current.focus();
    }
  };

  renderCalendarHeader = (previousMonth, nextMonth) => {
    const { bounds, locale, size, theme } = this.props;
    const { reference } = this.state;

    const PreviousIcon =
      size === 'small'
        ? theme.calendar.icons.small.previous
        : theme.calendar.icons.previous;

    const NextIcon =
      size === 'small'
        ? theme.calendar.icons.small.next
        : theme.calendar.icons.next;

    return (
      <Box direction="row" justify="between" align="center">
        <Box flex pad={{ horizontal: headingPadMap[size] || 'small' }}>
          <Heading
            level={
              size === 'small'
                ? (theme.calendar.heading && theme.calendar.heading.level) || 4
                : ((theme.calendar.heading && theme.calendar.heading.level) ||
                    4) - 1
            }
            size={size}
            margin="none"
          >
            {reference.toLocaleDateString(locale, {
              month: 'long',
              year: 'numeric',
            })}
          </Heading>
        </Box>
        <Box flex={false} direction="row" align="center">
          <Button
            a11yTitle={previousMonth.toLocaleDateString(locale, {
              month: 'long',
              year: 'numeric',
            })}
            icon={<PreviousIcon size={size !== 'small' ? size : undefined} />}
            disabled={!betweenDates(previousMonth, bounds)}
            onClick={() => this.setReference(previousMonth)}
          />
          <Button
            a11yTitle={nextMonth.toLocaleDateString(locale, {
              month: 'long',
              year: 'numeric',
            })}
            icon={<NextIcon size={size !== 'small' ? size : undefined} />}
            disabled={!betweenDates(nextMonth, bounds)}
            onClick={() => this.setReference(nextMonth)}
          />
        </Box>
      </Box>
    );
  };

  renderDaysOfWeek = (locale, size, start) => {
    let day = new Date(start);
    const days = [];
    while (days.length < 7) {
      days.push(
        <StyledDayContainer key={days.length} sizeProp={size}>
          <StyledDay otherMonth sizeProp={size}>
            {day.toLocaleDateString(locale, { weekday: 'narrow' })}
          </StyledDay>
        </StyledDayContainer>,
      );
      day = addDays(day, 1);
    }
    return <StyledWeek>{days}</StyledWeek>;
  };

  render() {
    const {
      bounds,
      date: dateProp,
      dates: datesProp,
      disabled,
      daysOfWeek,
      firstDayOfWeek,
      header,
      locale,
      onReference,
      onSelect,
      range,
      showAdjacentDays,
      size,
      theme,
      ...rest
    } = this.props;
    const {
      date,
      dates,
      focused,
      start,
      reference,
      end,
      slide,
      focusOnCalendar,
    } = this.state;

    // We have to deal with reference being the end of a month with more
    // days than the month we are changing to. So, we always set reference
    // to the first of the month before changing the month.
    const previousMonth = endOfMonth(
      subtractMonths(startOfMonth(reference), 1),
    );
    const nextMonth = startOfMonth(addMonths(startOfMonth(reference), 1));

    const weeks = [];
    let day = new Date(start);
    let days;
    this.dayRefs = {};

    while (day.getTime() < end.getTime()) {
      if (day.getDay() === firstDayOfWeek) {
        if (days) {
          weeks.push(<StyledWeek key={day.getTime()}>{days}</StyledWeek>);
        }
        days = [];
      }

      const otherMonth = day.getMonth() !== reference.getMonth();
      if (!showAdjacentDays && otherMonth) {
        days.push(
          <StyledDayContainer key={day.getTime()} sizeProp={size}>
            <StyledDay sizeProp={size} />
          </StyledDayContainer>,
        );
      } else {
        const dateString = day.toISOString();
        this.dayRefs[dateString] = React.createRef();
        let selected = false;
        let inRange = false;

        const selectedState = withinDates(day, date || dates);
        if (selectedState === 2) {
          selected = true;
        } else if (selectedState === 1) {
          inRange = true;
        }
        const dayDisabled =
          withinDates(day, disabled) || (bounds && !betweenDates(day, bounds));

        days.push(
          <StyledDayContainer key={day.getTime()} sizeProp={size}>
            <Button
              ref={this.dayRefs[dateString]}
              a11yTitle={day.toDateString()}
              plain
              hoverIndicator={!dayDisabled}
              disabled={dayDisabled}
              onClick={this.onClickDay(dateString)}
              onFocus={this.onFocus(day)}
              onBlur={() =>
                this.setState({ focused: false, focusOnCalendar: false })
              }
              tabIndex={focusOnCalendar ? -1 : 0}
            >
              <StyledDay
                inRange={inRange}
                otherMonth={day.getMonth() !== reference.getMonth()}
                isSelected={selected}
                sizeProp={size}
              >
                {day.getDate()}
              </StyledDay>
            </Button>
          </StyledDayContainer>,
        );
      }

      day = addDays(day, 1);
    }
    weeks.push(<StyledWeek key={day.getTime()}>{days}</StyledWeek>);

    return (
      <StyledCalendar sizeProp={size} {...rest}>
        <Keyboard
          onUp={event => {
            event.preventDefault();
            this.setFocus(addDays(focused, -7));
          }}
          onDown={event => {
            event.preventDefault();
            this.setFocus(addDays(focused, 7));
          }}
          onLeft={event => {
            event.preventDefault();
            this.setFocus(addDays(focused, -1));
          }}
          onRight={event => {
            event.preventDefault();
            this.setFocus(addDays(focused, 1));
          }}
        >
          <Box>
            {header
              ? header({
                  date: reference,
                  locale,
                  onPreviousMonth: () => this.setReference(previousMonth),
                  onNextMonth: () => this.setReference(nextMonth),
                  previousInBound: betweenDates(previousMonth, bounds),
                  nextInBound: betweenDates(nextMonth, bounds),
                })
              : this.renderCalendarHeader(previousMonth, nextMonth)}
            {daysOfWeek && this.renderDaysOfWeek(locale, size, start)}
            <StyledWeeksContainer sizeProp={size}>
              <StyledWeeks slide={slide} sizeProp={size}>
                {weeks}
              </StyledWeeks>
            </StyledWeeksContainer>
          </Box>
        </Keyboard>
      </StyledCalendar>
    );
  }
}

Object.setPrototypeOf(Calendar.defaultProps, defaultProps);

let CalendarDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  CalendarDoc = require('./doc').doc(Calendar);
}
const CalendarWrapper = compose(withTheme)(CalendarDoc || Calendar);

export { CalendarWrapper as Calendar };
