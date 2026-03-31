import React from 'react';

import { Box, Clock } from 'grommet';

export const Countdown = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={grommet}>
  <Box align="center" justify="start" pad="large">
    <Clock type="digital" time="PT0H0M20S" run="backward" />
  </Box>
  // </Grommet>
);

Countdown.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Visualizations/Clock/Countdown',
};
