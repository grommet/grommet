import React from 'react';

import { Box, Grommet, Clock } from 'grommet';
import { grommet } from 'grommet/themes';

export const Countdown = () => (
  <Grommet theme={grommet}>
    <Box align="center" justify="start" pad="large">
      <Clock type="digital" time="PT0H0M20S" run="backward" />
    </Box>
  </Grommet>
);

Countdown.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Visualizations/Clock/Countdown',
};
