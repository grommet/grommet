import React from 'react';

import { Box, Chart } from 'grommet';

export const Horizontal = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={grommet}>
  <Box align="center" pad="large" gap="large">
    {['bar', 'line', 'area', 'point'].map((type) => (
      <Box key={type} direction="row" gap="medium">
        {['vertical', 'horizontal'].map((direction) => (
          <Box key={direction} border>
            <Chart
              type={type}
              direction={direction}
              size="small"
              values={[
                [10, 20],
                [20, 30],
                [30, 15],
              ]}
            />
          </Box>
        ))}
      </Box>
    ))}
  </Box>
  // </Grommet>
);

export default {
  title: 'Visualizations/Chart/Horizontal',
};
