import React from 'react';

import { Box, Meter } from 'grommet';

export const SemiCircle = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={grommet}>
  <Box align="center" pad="large">
    <Meter size="medium" type="semicircle" background="light-2" value={60} />
  </Box>
  // </Grommet>
);

export default {
  title: 'Visualizations/Meter/Semi Circle',
};
