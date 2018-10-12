import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import {
 Box, Button, Calendar, Grommet, Text,
} from 'grommet';
import { grommet } from 'grommet/themes';

import { FormPreviousLink, FormNextLink } from 'grommet-icons';

class SimpleCalendar extends Component {
  state = {}

  onSelect = date => this.setState({ date })

  render() {
    const { date } = this.state;
    return (
      <Grommet theme={grommet}>
        <Calendar date={date} onSelect={this.onSelect} size='small' bounds={['2018-09-08', '2018-12-13']} />
      </Grommet>
    );
  }
}

class RichCalendar extends Component {
  state = {}

  onSelect = (selectedDate) => {
    const { date, dates, previousSelectedDate } = this.state;
    if (!dates) {
      if (!date) {
        this.setState({ date: selectedDate });
      } else {
        const priorDate = new Date(date);
        const nextDate = new Date(selectedDate);
        if (priorDate.getTime() < nextDate.getTime()) {
          this.setState({ date: undefined, dates: [[date, selectedDate]] });
        } else if (priorDate.getTime() > nextDate.getTime()) {
          this.setState({ date: undefined, dates: [[selectedDate, date]] });
        }
      }
    } else {
      const priorDates = dates[0].map(d => new Date(d));
      const previousDate = new Date(previousSelectedDate);
      const nextDate = new Date(selectedDate);
      if (nextDate.getTime() < previousDate.getTime()) {
        if (nextDate.getTime() < priorDates[0].getTime()) {
          this.setState({ dates: [[selectedDate, dates[0][1]]] });
        } else if (nextDate.getTime() > priorDates[0].getTime()) {
          this.setState({ dates: [[dates[0][0], selectedDate]] });
        }
      } else if (nextDate.getTime() > previousDate.getTime()) {
        if (nextDate.getTime() > priorDates[1].getTime()) {
          this.setState({ dates: [[dates[0][0], selectedDate]] });
        } else if (nextDate.getTime() < priorDates[1].getTime()) {
          this.setState({ dates: [[selectedDate, dates[0][1]]] });
        }
      }
    }
    this.setState({ previousSelectedDate: selectedDate });
  }

  render() {
    const { date, dates } = this.state;
    return (
      <Grommet theme={grommet}>
        <Calendar date={date} dates={dates} onSelect={this.onSelect} />
      </Grommet>
    );
  }
}

class CustomHeaderCalendar extends Component {
  state = {}

  onSelect = date => this.setState({ date })

  render() {
    const { date } = this.state;
    return (
      <Grommet theme={grommet}>
        <Calendar
          date={date}
          onSelect={this.onSelect}
          size='small'
          bounds={['2018-09-08', '2018-12-13']}
          header={({
            date: currentDate, locale, onPreviousMonth, onNextMonth, previousInBound, nextInBound,
          }) => (
            <Box direction='row' align='center' justify='between'>
              <Button
                onClick={previousInBound && onPreviousMonth}
              >
                <Box>
                  <FormPreviousLink />
                </Box>
              </Button>
              <Text size='small'>
                <strong>{currentDate.toLocaleDateString(locale, { month: 'long', year: 'numeric' })}</strong>
              </Text>
              <Button
                onClick={nextInBound && onNextMonth}
              >
                <Box>
                  <FormNextLink />
                </Box>
              </Button>

            </Box>
          )}
        />
      </Grommet>
    );
  }
}

storiesOf('Calendar', module)
  .add('Simple Calendar', () => <SimpleCalendar />)
  .add('Range Calendar', () => <RichCalendar />)
  .add('Custom Header', () => <CustomHeaderCalendar />);
