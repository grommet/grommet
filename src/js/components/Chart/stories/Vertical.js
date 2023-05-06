import React from 'react';

import { Box, Chart } from 'grommet';

export const Vertical = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={grommet}>
  <Box align="center" pad="large">
    <Chart
      type="bar"
      direction="vertical"
      size="small"
      values={[
        [10, 20],
        [20, 30],
        [30, 15],
      ]}
    />
  </Box>
  // </Grommet>
);

export default {
  title: 'Visualizations/Chart/Vertical',
};
