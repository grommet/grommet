import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Calendar } from 'mnet-ui-base';

const RangeCalendar = () => (
  <>
    <Box align="center" pad="large">
      <Calendar range />
    </Box>
  </>
);

storiesOf('Calendar', module).add('Range', () => <RangeCalendar />);
