import React from 'react';

import { Box, Chart, Heading } from 'grommet';

const values = [{ value: [10, 20] }, { value: [20, 30] }, { value: [30, 15] }];

export const Types = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={grommet}>
  <Box direction="row-responsive" wrap pad="large">
    {['bar', 'line', 'area', 'point'].map((type) => (
      <Box key={type} margin="medium">
        <Heading size="small" textAlign="center">
          {type}
        </Heading>
        <Chart type={type} values={values} />
      </Box>
    ))}
  </Box>
  // </Grommet>
);

export default {
  title: 'Visualizations/Chart/Types',
};
