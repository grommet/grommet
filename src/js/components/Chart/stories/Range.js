import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, Chart, Heading } from 'grommet';
import { grommet } from 'grommet/themes';

const values = [
  [10, 20, 30],
  [20, 30, 60],
  [30, 15, 20],
];

const Example = () => (
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

storiesOf('Chart', module).add('Range', () => <Example />);
