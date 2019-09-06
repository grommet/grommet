import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { deepMerge } from 'grommet/utils';

import { Box, Calendar, Grommet, grommet } from 'grommet';

const customTheme = deepMerge(grommet,{
  calendar:{
    heading: {
      level: '3' },
  },
});


class SimpleCalendar extends Component {
  state = {};

  onSelect = nextDate => {
    const { date } = this.state;
    this.setState({ date: nextDate !== date ? nextDate : undefined });
  };

  render() {
    const { date } = this.state;
    return (
      <Grommet theme={customTheme}>
        <Box align="center" pad="large">
          <Calendar
            date={date}
            onSelect={this.onSelect}
            bounds={['2018-09-08', '2020-12-13']}
          />
        </Box>
        <Box align="center" pad="large">
          <Calendar
            date={date}
            daysOfWeek
            onSelect={this.onSelect}
            size="small"
            bounds={['2018-09-08', '2020-12-13']}
          />
        </Box>
      </Grommet>
    );
  }
}

storiesOf('Calendar', module).add('Simple', () => <SimpleCalendar />);
