import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, Chart } from 'grommet';
import { grommet } from 'grommet/themes';

const values = [
  {
    value: [10, 20],
    thickness: 12,
    color: 'status-critical',
    opacity: 'medium',
  },
  {
    value: [10, 30],
    thickness: 29,
    color: 'status-critical',
    opacity: 'medium',
  },
  {
    value: [11, 37],
    thickness: 68,
    color: 'status-critical',
    opacity: 'medium',
  },
  {
    value: [13, 10],
    thickness: 'small',
    color: 'status-critical',
    opacity: 'medium',
  },
  { value: [20, 30], thickness: 'small', color: 'status-ok' },
  { value: [22, 5], thickness: 'medium', color: 'status-ok' },
  { value: [27, 42], thickness: 'large', color: 'status-ok' },
  { value: [30, 15], thickness: 'large', color: 'status-warning' },
];

const Example = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large" gap="large">
      <Chart type="point" point="circle" values={values} />
      <Chart type="bar" values={values} />
    </Box>
  </Grommet>
);

storiesOf('Chart', module).add('Value Style', () => <Example />);
