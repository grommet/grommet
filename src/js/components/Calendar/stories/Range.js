import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Calendar, MnetUIBase } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

const RangeCalendar = () => (
  <MnetUIBase theme={mnet}>
    <Box align="center" pad="large">
      <Calendar range />
    </Box>
  </MnetUIBase>
);

storiesOf('Calendar', module).add('Range', () => <RangeCalendar />);
