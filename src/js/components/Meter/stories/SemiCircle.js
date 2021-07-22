import React from 'react';

import { Grommet, Box, Meter } from 'grommet';
import { grommet } from 'grommet/themes';

export const SemiCircle = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <Meter type="semicircle" background="light-2" value={80} />
    </Box>
  </Grommet>
);

export default {
  title: 'Visualizations/Meter/Semi Circle',
};
