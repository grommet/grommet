import React from 'react';

import { Box, Calendar } from 'grommet';

export const Fill = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box align="center">
    <Box height="large" width="large" border>
      <Calendar fill daysOfWeek />
    </Box>
  </Box>
  // </Grommet>
);

export default {
  title: 'Visualizations/Calendar/Fill',
};
