import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Button, Calendar, Grommet, Heading } from 'grommet';
import { grommet } from 'grommet/themes';

import { Blank, Previous, Next } from 'grommet-icons';

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

storiesOf('Calendar', module).add('Dual', () => <DualCalendar />);
