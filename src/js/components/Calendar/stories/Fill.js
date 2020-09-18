import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Calendar, Grommet } from 'grommet';

import { grommet } from 'grommet/themes';

const FillCalendar = () => {
  return (
    <Grommet theme={grommet}>
      <Box align="center">
        <Box height="large" width="large" border>
          <Calendar fill daysOfWeek />
        </Box>
      </Box>
    </Grommet>
  );
};

storiesOf('Calendar', module).add('Fill', () => <FillCalendar />);
