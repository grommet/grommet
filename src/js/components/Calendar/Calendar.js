import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { compose } from 'recompose';
import moment from 'moment';

import { FormPrevious, FormNext, Previous, Next } from 'grommet-icons';

import { Box } from '../Box';
import { Button } from '../Button';
import { Keyboard } from '../Keyboard';
import { Heading } from '../Heading';

import { withTheme } from '../hocs';

import StyledCalendar, {
  StyledDay, StyledDayContainer, StyledWeek, StyledWeeks, StyledWeeksContainer,
} from './StyledCalendar';
import doc from './doc';

const between = (date, dates) => {
  let result;
  if (dates) {
    const [from, to] = dates;
    if (date.isSame(from, 'day') || date.isSame(to, 'day')) {
      result = 2;
    } else if (date.isSameOrAfter(from, 'day') &&
      date.isSameOrBefore(to, 'day')) {
      result = 1;
    }
  } else {
    result = 1;
  }
  return result;
};

const within = (date, dates) => {
  let result = 0;
  if (dates) {
    if (Array.isArray(dates)) {
      dates.some((d) => {
        if (typeof d === 'string') {
          if (date.isSame(d, 'day')) {
            result = 2;
          }
        } else {
          result = between(date, d);
        }
        return result;
      });
    } else if (date.isSame(dates, 'day')) {
      result = 2;
    }
  }
  return result;
};

const buildStartEnd = (reference) => {
  const start = moment(reference).startOf('month').startOf('week');
  const end = moment(start).add(5, 'weeks').endOf('week');
  return { start, end };
};

const buildState = (props) => {
  const { date, dates } = props;
  let reference;
  if (date) {
    reference = moment(date);
  } else if (dates && dates.length > 0) {
    if (typeof dates[0] === 'string') {
      reference = moment(dates[0]);
    } else if (Array.isArray(dates[0])) {
      reference = moment(dates[0][0]);
    } else {
      reference = moment();
    }
  } else {
    reference = moment();
  }
  if (props.locale) {
    reference.locale(props.locale);
  }
  return {
    ...buildStartEnd(reference),
    reference,
    active: moment(reference),
  };
};

class Calendar extends Component {
  static defaultProps = {
    size: 'medium',
  };

  dayRefs = {}

  constructor(props) {
    super(props);
    this.state = buildState(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(buildState(nextProps));
  }

  componentDidUpdate() {
    const { active } = this.state;
    if (this.setFocus) {
      this.setFocus = false;
      const ref = this.dayRefs[active.toISOString()];
      if (ref) {
        findDOMNode(ref).focus();
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  setReference = (reference) => {
    const { bounds } = this.props;
    const { start, end } = this.state;
    if (between(reference, bounds)) {
      const nextStartEnd = buildStartEnd(reference);
      const nextState = {
        reference,
        active: undefined,
      };
      if (nextStartEnd.start.isBefore(start)) {
        nextState.start = nextStartEnd.start;
        nextState.slide = {
          direction: 'down',
          weeks: start.diff(nextStartEnd.start, 'weeks'),
        };
        clearTimeout(this.timer);
        this.timer = setTimeout(() =>
          this.setState({ end: nextStartEnd.end, slide: undefined }), 1000);
      } else if (nextStartEnd.end.isAfter(end)) {
        nextState.end = nextStartEnd.end;
        nextState.slide = {
          direction: 'up',
          weeks: nextStartEnd.end.diff(end, 'weeks'),
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
    if (between(active, bounds)) {
      const nextState = { active };
      if (active.isBefore(start)) {
        nextState.start = moment(start).subtract(1, 'week');
        nextState.end = moment(end).subtract(1, 'week');
      } else if (active.isAfter(end)) {
        nextState.start = moment(start).add(1, 'week');
        nextState.end = moment(end).add(1, 'week');
      }
      if (!active.isSame(reference, 'month')) {
        nextState.reference = moment(active);
      }
      this.setFocus = true;
      this.setState(nextState);
    }
  }

  render() {
    const {
      bounds, date, dates, disabled, onSelect, size, theme, ...rest
    } = this.props;
    const { active, start, reference, end, slide } = this.state;

    const previousMonth = moment(reference).subtract(1, 'month');
    const nextMonth = moment(reference).add(1, 'month');

    const weeks = [];
    const day = moment(start);
    let days;

    while (day.isBefore(end)) {
      if (!day.weekday()) {
        if (days) {
          weeks.push((
            <StyledWeek key={day.week()} theme={theme}>{days}</StyledWeek>
          ));
        }
        days = [];
      }

      const dateString = day.toISOString();
      let content = day.format('D');
      let selected = false;
      let inRange = false;
      let background;

      const selectedState = within(day, date || dates);
      if (selectedState === 2) {
        selected = true;
      } else if (selectedState === 1) {
        inRange = true;
      }
      const dayDisabled = within(day, disabled);
      if (selected) {
        background = 'brand';
        content = <strong>{content}</strong>;
      } else if (inRange) {
        background = { color: 'brand', opacity: 'weak' };
      }

      days.push(
        <StyledDayContainer key={day.day()} size={size} theme={theme}>
          <Button
            ref={(ref) => { this.dayRefs[dateString] = ref; }}
            a11yTitle={day.format('LL')}
            plain={true}
            active={active && day.isSame(active, 'day')}
            hoverIndicator={!dayDisabled}
            onClick={dayDisabled ? undefined : () => {
              this.setState({ active: moment(dateString) });
              onSelect(dateString);
            }}
          >
            <StyledDay
              background={background}
              otherMonth={!day.isSame(reference, 'month')}
              size={size}
              theme={theme}
            >
              {content}
            </StyledDay>
          </Button>
        </StyledDayContainer>
      );
      day.add(1, 'day');
    }
    weeks.push((
      <StyledWeek key={day.week()} theme={theme}>{days}</StyledWeek>
    ));

    return (
      <StyledCalendar size={size} theme={theme} {...rest}>
        <Keyboard
          onUp={(event) => {
            event.preventDefault();
            this.setActive(moment(active).subtract(1, 'week'));
          }}
          onDown={(event) => {
            event.preventDefault();
            this.setActive(moment(active).add(1, 'week'));
          }}
          onLeft={() => this.setActive(moment(active).subtract(1, 'day'))}
          onRight={() => this.setActive(moment(active).add(1, 'day'))}
        >
          <Box>
            <Box direction='row' justify='between' align='center'>
              <Heading level={3} size={size} margin='none'>
                <strong>{reference.format('MMMM YYYY')}</strong>
              </Heading>
              <Box direction='row' align='center'>
                <Button
                  a11yTitle={previousMonth.format('MMMM YYYY')}
                  icon={size === 'small' ?
                    <FormPrevious /> : <Previous size={size} />}
                  onClick={(onSelect && between(previousMonth, bounds)) ?
                    () => this.setReference(previousMonth) : undefined}
                />
                <Button
                  a11yTitle={nextMonth.format('MMMM YYYY')}
                  icon={size === 'small' ? <FormNext /> : <Next size={size} />}
                  onClick={(onSelect && between(nextMonth, bounds)) ?
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

if (process.env.NODE_ENV !== 'production') {
  doc(Calendar);
}

export default compose(
  withTheme,
)(Calendar);
