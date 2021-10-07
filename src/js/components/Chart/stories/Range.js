import React from 'react';

import { Grommet, Box, Chart, Heading } from 'grommet';
import { grommet } from 'grommet/themes';

const values = [
  [10, 20, 30],
  [20, 30, 60],
  [30, 15, 20],
];

export const Range = () => (
  <Grommet theme={grommet}>
    <Box direction="row-responsive" wrap pad="large">
      {['bar', 'line', 'area', 'point'].map(type => (
        <Box key={type} margin="medium">
          <Heading size="small" textAlign="center">
            {type}
          </Heading>
          <Chart type={type} values={values} thickness="small" />
        </Box>
      ))}
    </Box>
  </Grommet>
);

export default {
  title: 'Visualizations/Chart/Range',
};
