import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import Calendar from '../Calendar/Calendar';
import Grommet from '../Grommet/Grommet';

class SimpleCalendar extends Component {
  state = {}

  onSelect = date => this.setState({ date })

  render() {
    const { date } = this.state;
    return (
      <Grommet>
        <Calendar date={date} onSelect={this.onSelect} />
      </Grommet>
    );
  }
}

storiesOf('Calendar', module)
  .add('Simple Calendar', () => <SimpleCalendar />);
