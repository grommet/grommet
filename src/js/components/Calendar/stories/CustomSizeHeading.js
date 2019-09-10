import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { deepMerge } from 'grommet/utils';

import { Box, Calendar, Grommet, grommet } from 'grommet';

const customHeading = deepMerge(grommet, {
  calendar: {
    heading: {
      level: '3',
    },
  },
});

class CustomSizeCalendar extends Component {
  state = {};

  onSelect = nextDate => {
    const { date } = this.state;
    this.setState({ date: nextDate !== date ? nextDate : undefined });
  };

  render() {
    const { date } = this.state;
    return (
      <Grommet theme={customHeading}>
        <Box align="center" pad="large">
          <Calendar
            date={date}
            onSelect={this.onSelect}
            bounds={['2018-09-08', '2020-12-13']}
          />
        </Box>
      </Grommet>
    );
  }
}

storiesOf('Calendar', module).add('Heading Size', () => <CustomSizeCalendar />);
