import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Calendar, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

const RangeCalendar = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <Calendar range />
    </Box>
  </Grommet>
);

storiesOf('Calendar', module).add('Range', () => <RangeCalendar />);
