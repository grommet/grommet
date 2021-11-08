import React from 'react';

import { Box, Meter } from 'grommet';

export const Pie = () => (
  // Uncomment <Grommet> lines when using outside of storybook8
  // <Grommet theme={grommet}>
  <Box align="center" pad="large">
    <Meter
      type="pie"
      background="light-2"
      size="small"
      values={[{ value: 70 }, { value: 20 }, { value: 10 }]}
    />
  </Box>
  // </Grommet>
);

export default {
  title: 'Visualizations/Meter/Pie',
};
