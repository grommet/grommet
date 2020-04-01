import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Calendar, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

const RangeCalendar = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <Calendar dates={[['2020-04-03', '2020-04-08']]} range />
    </Box>
  </Grommet>
);

storiesOf('Calendar', module).add('Range', () => <RangeCalendar />);
