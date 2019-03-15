import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Button, Calendar, Grommet, Heading, Text } from 'grommet';
import { grommet } from 'grommet/themes';

import {
  Blank,
  FormPreviousLink,
  FormNextLink,
  Previous,
  Next,
} from 'grommet-icons';

class SimpleCalendar extends Component {
  state = {};

  onSelect = nextDate => {
    const { date } = this.state;
    this.setState({ date: nextDate !== date ? nextDate : undefined });
  };

  render() {
    const { date } = this.state;
    const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    return (
      <Grommet theme={grommet}>
        <Box align="center" pad="large">
          <Calendar
            date={date}
            onSelect={this.onSelect}
            size="small"
            bounds={['2018-09-08', '2018-12-13']}
          />
        </Box>
        <Box align="center" pad="large">
          <Calendar
            date={date}
            onSelect={this.onSelect}
            size="small"
            bounds={['2018-09-08', '2018-12-13']}
            content={
              <Box gap="small" direction="row" pad="xsmall">
                {days.map(day => (
                  <Text key={day} color="dark-1" size="xsmall">
                    {day}
                  </Text>
                ))}
              </Box>
            }
          />
        </Box>
      </Grommet>
    );
  }
}

const RangeCalendar = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <Calendar range />
    </Box>
  </Grommet>
);

const now = new Date();
const next = new Date(now);
next.setMonth(now.getMonth() + 1, 1);

class DualCalendar extends Component {
  state = {
    reference1: now,
    reference2: next,
  };

  onSelect = arg => {
    if (Array.isArray(arg)) {
      this.setState({ date: undefined, dates: arg });
    } else {
      this.setState({ date: arg, dates: undefined });
    }
  };

  render() {
    const { date, dates, reference1, reference2 } = this.state;
    return (
      <Grommet theme={grommet}>
        <Box justify="center" pad="large" direction="row" gap="small">
          <Calendar
            animate={false}
            showAdjacentDays={false}
            range
            date={date}
            dates={dates}
            onSelect={this.onSelect}
            reference={reference1.toISOString()}
            onReference={reference => {
              const refDate = new Date(reference);
              const nextDate = new Date(refDate);
              nextDate.setMonth(refDate.getMonth() + 1, 1);
              this.setState({
                reference1: refDate,
                reference2: nextDate,
              });
            }}
            header={({
              date: currentDate,
              locale,
              onPreviousMonth,
              previousInBound,
            }) => (
              <Box direction="row" align="center" justify="between">
                <Button
                  disabled={!previousInBound}
                  icon={<Previous />}
                  onClick={onPreviousMonth}
                />
                <Heading level={3} margin="none">
                  {currentDate.toLocaleDateString(locale, {
                    month: 'long',
                    year: 'numeric',
                  })}
                </Heading>
                <Blank />
              </Box>
            )}
          />
          <Calendar
            animate={false}
            showAdjacentDays={false}
            date={date}
            dates={dates}
            range
            onSelect={this.onSelect}
            reference={reference2.toISOString()}
            onReference={reference => {
              const refDate = new Date(reference);
              const priorDate = new Date(refDate);
              priorDate.setMonth(refDate.getMonth() - 1, 1);
              this.setState({
                reference1: priorDate,
                reference2: refDate,
              });
            }}
            header={({
              date: currentDate,
              locale,
              onNextMonth,
              nextInBound,
            }) => (
              <Box direction="row" align="center" justify="between">
                <Blank />
                <Heading level={3} margin="none">
                  {currentDate.toLocaleDateString(locale, {
                    month: 'long',
                    year: 'numeric',
                  })}
                </Heading>
                <Button
                  disabled={!nextInBound}
                  icon={<Next />}
                  onClick={onNextMonth}
                />
              </Box>
            )}
          />
        </Box>
      </Grommet>
    );
  }
}

class CustomHeaderCalendar extends Component {
  state = {};

  onSelect = nextDate => {
    const { date } = this.state;
    this.setState({ date: nextDate !== date ? nextDate : undefined });
  };

  render() {
    const { date } = this.state;
    return (
      <Grommet theme={grommet}>
        <Box align="center" pad="large">
          <Calendar
            date={date}
            onSelect={this.onSelect}
            size="small"
            bounds={['2018-09-08', '2018-12-13']}
            content={
              <Box align="center" justify="center" pad="small">
                busy month is coming
              </Box>
            }
            header={({
              date: currentDate,
              locale,
              onPreviousMonth,
              onNextMonth,
              previousInBound,
              nextInBound,
            }) => (
              <Box direction="row" align="center" justify="between">
                <Button disabled={!previousInBound} onClick={onPreviousMonth}>
                  <Box>
                    <FormPreviousLink />
                  </Box>
                </Button>
                <Text size="small">
                  <strong>
                    {currentDate.toLocaleDateString(locale, {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </strong>
                </Text>
                <Button disabled={!nextInBound} onClick={onNextMonth}>
                  <Box>
                    <FormNextLink />
                  </Box>
                </Button>
              </Box>
            )}
          />
        </Box>
      </Grommet>
    );
  }
}

// DSTCalendar has dates specifically chosen to identify issues with
// crossing the daylight savings time boundary (from California).
const DSTCalendar = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <Calendar
        date="2018-11-04T07:00:00.000Z"
        bounds={['2013-11-06', '2018-12-06']}
      />
    </Box>
  </Grommet>
);

storiesOf('Calendar', module)
  .add('Simple', () => <SimpleCalendar />)
  .add('Range', () => <RangeCalendar />)
  .add('Dual', () => <DualCalendar />)
  .add('Custom Header', () => <CustomHeaderCalendar />)
  .add('Daylight Savings Time', () => <DSTCalendar />);
