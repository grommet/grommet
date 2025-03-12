import React from 'react';

import { Box, Chart, Heading } from 'grommet';

const values = [
  [10, 20, 30],
  [20, 30, 60],
  [30, 15, 20],
];

export const Range = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={grommet}>
  <Box direction="row-responsive" wrap pad="large">
    {['bar', 'line', 'area', 'point'].map((type) => (
      <Box key={type} margin="medium">
        <Heading size="small" textAlign="center">
          {type}
        </Heading>
        <Chart type={type} values={values} thickness="small" />
      </Box>
    ))}
  </Box>
  // </Grommet>
);

export default {
  title: 'Visualizations/Chart/Range',
};
