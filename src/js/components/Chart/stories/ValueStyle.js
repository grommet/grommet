import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, Chart } from 'grommet';
import { grommet } from 'grommet/themes';

const values = [
  { value: [10, 20], thickness: 'small', color: 'status-critical' },
  { value: [20, 30], thickness: 'medium', color: 'status-ok' },
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
