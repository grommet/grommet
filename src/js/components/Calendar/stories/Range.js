import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Calendar } from 'mnet-ui-base';

const RangeCalendar = () => (
  <>
    <Box align="center" pad="large">
      <Calendar dates={[['2020-04-03', '2020-04-08']]} range />
    </Box>
  </>
);

storiesOf('Calendar', module).add('Range', () => <RangeCalendar />);
