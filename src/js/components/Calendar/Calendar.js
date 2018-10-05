import React, { Component } from 'react';
// import { findDOMNode } from 'react-dom';
import { compose } from 'recompose';

import { Box } from '../Box';
import { Button } from '../Button';
import { Heading } from '../Heading';
import { Keyboard } from '../Keyboard';
import { withTheme } from '../hocs';

import {
  StyledCalendar, StyledDay, StyledDayContainer, StyledWeek, StyledWeeks,
  StyledWeeksContainer,
} from './StyledCalendar';
import {
  addDays, addMonths, betweenDates, daysApart, sameDay,
  subtractDays, subtractMonths, withinDates,
} from './utils';

const buildStartEnd = (reference, firstDayOfWeek) => {
  let start = new Date(reference);
  start.setDate(1); // first of month
  start = subtractDays(start, start.getDay() - firstDayOfWeek); // beginning of week
  const end = addDays(start, (7 * 5) + 6); // 5 weeks to end of week
  return { start, end };
};

const buildState = (props) => {
  const { date, dates, firstDayOfWeek } = props;
  let reference;
  if (date) {
    reference = new Date(date);
  } else if (dates && dates.length > 0) {
    if (typeof dates[0] === 'string') {
      reference = new Date(dates[0]);
    } else if (Array.isArray(dates[0])) {
      reference = new Date(dates[0][0]);
    } else {
      reference = new Date();
    }
  } else {
    reference = new Date();
  }
  return {
    ...buildStartEnd(reference, firstDayOfWeek),
    reference,
    active: new Date(reference),
  };
};

class Calendar extends Component {
  static defaultProps = {
    firstDayOfWeek: 0,
    size: 'medium',
    locale: 'en-US',
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { reference } = prevState;
    if (!reference) {
      return buildState(nextProps);
    }
    return null;
  }

  state = {}

  // componentDidUpdate() {
  //   if (this.setFocus) {
  //     this.setFocus = false;
  //     // if (this.activeRef) {
  //     //   findDOMNode(this.activeRef).focus();
  //     // }
  //   }
  // }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  setReference = (reference) => {
    const { bounds, firstDayOfWeek } = this.props;
    const { start, end } = this.state;
    if (betweenDates(reference, bounds)) {
      const nextStartEnd = buildStartEnd(reference, firstDayOfWeek);
      const nextState = {
        reference,
        active: undefined,
      };
      if (nextStartEnd.start.getTime() < start.getTime()) {
        nextState.start = nextStartEnd.start;
        nextState.slide = {
          direction: 'down',
          weeks: daysApart(start, nextStartEnd.start) / 7,
        };
        clearTimeout(this.timer);
        this.timer = setTimeout(() =>
          this.setState({ end: nextStartEnd.end, slide: undefined }), 1000);
      } else if (nextStartEnd.end.getTime() > end.getTime()) {
        nextState.end = nextStartEnd.end;
        nextState.slide = {
          direction: 'up',
          weeks: daysApart(nextStartEnd.end, end) / 7,
        };
        clearTimeout(this.timer);
        this.timer = setTimeout(() =>
          this.setState({ start: nextStartEnd.start, slide: undefined }), 1000);
      }
      this.setState(nextState);
    }
  }

  setActive = (active) => {
    const { bounds } = this.props;
    const { start, reference, end } = this.state;
    if (betweenDates(active, bounds)) {
      const nextState = { active };
      if (active.getTime() < start.getTime()) {
        nextState.start = subtractDays(start, 7);
        nextState.end = subtractDays(end, 7);
      } else if (active.getTime() > end.getTime()) {
        nextState.start = addDays(start, 7);
        nextState.end = addDays(end, 7);
      }
      if (active.getMonth() !== reference.getMonth()) {
        nextState.reference = new Date(active);
      }
      this.setFocus = true;
      this.setState(nextState);
    }
  }

  onClickDay = dateString => () => {
    const { onSelect } = this.props;
    this.setState({ active: new Date(dateString) });
    if (onSelect) {
      onSelect(dateString);
    }
  };

  render() {
    const {
      bounds, date, dates, disabled, firstDayOfWeek, locale, onSelect, size,
      theme, ...rest
    } = this.props;
    const { active, start, reference, end, slide } = this.state;

    const previousMonth = subtractMonths(reference, 1);
    const nextMonth = addMonths(reference, 1);

    const weeks = [];
    let day = new Date(start);
    let days;

    while (day.getTime() < end.getTime()) {
      if (day.getDay() === firstDayOfWeek) {
        if (days) {
          weeks.push((
            <StyledWeek key={day.getTime()} theme={theme}>{days}</StyledWeek>
          ));
        }
        days = [];
      }

      const dateString = day.toISOString();
      const isActive = active && sameDay(day, active);
      let selected = false;
      let inRange = false;

      const selectedState = withinDates(day, date || dates);
      if (selectedState === 2) {
        selected = true;
      } else if (selectedState === 1) {
        inRange = true;
      }
      const dayDisabled = withinDates(day, disabled);

      days.push(
        <StyledDayContainer key={day.getTime()} size={size} theme={theme}>
          <Button
            ref={(ref) => {
              if (isActive) this.activeRef = ref;
            }}
            a11yTitle={day.toDateString()}
            plain={true}
            active={isActive}
            hoverIndicator={!dayDisabled}
            onClick={dayDisabled ? undefined : this.onClickDay(dateString)}
          >
            <StyledDay
              inRange={inRange}
              otherMonth={day.getMonth() !== reference.getMonth()}
              isSelected={selected}
              size={size}
              theme={theme}
            >
              {day.getDate()}
            </StyledDay>
          </Button>
        </StyledDayContainer>
      );
      day = addDays(day, 1);
    }
    weeks.push((
      <StyledWeek key={day.getTime()} theme={theme}>{days}</StyledWeek>
    ));

    const PreviousIcon = size === 'small' ? (
      theme.calendar.icons.small.previous
    ) : (
      theme.calendar.icons.previous
    );

    const NextIcon = size === 'small' ? (
      theme.calendar.icons.small.next
    ) : (
      theme.calendar.icons.next
    );

    return (
      <StyledCalendar size={size} theme={theme} {...rest}>
        <Keyboard
          onUp={(event) => {
            event.preventDefault();
            this.setActive(addDays(active, -7));
          }}
          onDown={(event) => {
            event.preventDefault();
            this.setActive(addDays(active, 7));
          }}
          onLeft={() => this.setActive(addDays(active, -1))}
          onRight={() => this.setActive(addDays(active, 1))}
        >
          <Box>
            <Box direction='row' justify='between' align='center'>
              <Box basis='1/2' direction='row' pad={{ horizontal: 'small' }}>
                <Heading level={3} size={size} margin='none'>
                  {reference.toLocaleDateString(locale, { month: 'long', year: 'numeric' })}
                </Heading>
              </Box>
              <Box basis='1/2' direction='row'>
                <Button
                  a11yTitle={previousMonth.toLocaleDateString(locale, { month: 'long', year: 'numeric' })}
                  icon={<PreviousIcon size={size !== 'small' ? size : undefined} />}
                  onClick={(onSelect && betweenDates(previousMonth, bounds)) ?
                    () => this.setReference(previousMonth) : undefined}
                />
                <Button
                  a11yTitle={nextMonth.toLocaleDateString(locale, { month: 'long', year: 'numeric' })}
                  icon={<NextIcon size={size !== 'small' ? size : undefined} />}
                  onClick={(onSelect && betweenDates(nextMonth, bounds)) ?
                    () => this.setReference(nextMonth) : undefined}
                />
              </Box>
            </Box>
            <StyledWeeksContainer size={size} theme={theme}>
              <StyledWeeks slide={slide} size={size} theme={theme}>
                {weeks}
              </StyledWeeks>
            </StyledWeeksContainer>
          </Box>
        </Keyboard>
      </StyledCalendar>
    );
  }
}

let CalendarDoc;
if (process.env.NODE_ENV !== 'production') {
  CalendarDoc = require('./doc').doc(Calendar); // eslint-disable-line global-require
}
const CalendarWrapper = compose(
  withTheme,
)(CalendarDoc || Calendar);

export { CalendarWrapper as Calendar };
