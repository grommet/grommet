import React from 'react';

import { Box, Chart, Heading } from 'grommet';

const values = [{ value: [10, 20] }, { value: [20, 30] }, { value: [30, 15] }];

export const Point = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={grommet}>
  <Box direction="row-responsive" wrap pad="large">
    {['circle', 'square', 'diamond', 'star', 'triangle', 'triangleDown'].map(
      (point) => (
        <Box key={point} margin="medium">
          <Heading size="small" textAlign="center">
            {point}
          </Heading>
          <Chart type="point" values={values} point={point} />
        </Box>
      ),
    )}
  </Box>
  // </Grommet>
);

export default {
  title: 'Visualizations/Chart/Point',
};
