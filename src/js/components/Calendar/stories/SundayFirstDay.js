import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Calendar } from 'mnet-ui-base';

// When the first day of the month is Sunday, and the request of firstDayOfWeek
// is Monday, we are verifing we are not missing a week, issue 3253.
const SundayFirstDay = () => (
  <>
    <Box align="center" pad="large">
      <Calendar firstDayOfWeek={1} date={new Date(2019, 8, 2).toISOString()} />
    </Box>
  </>
);

storiesOf('Calendar', module).add('1st on Sunday', () => <SundayFirstDay />);
