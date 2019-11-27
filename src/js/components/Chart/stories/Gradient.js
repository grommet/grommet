import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, Chart } from 'grommet';
import { grommet } from 'grommet/themes';

const gradient = [
  { value: 0, color: 'status-ok' },
  { value: 20, color: 'status-ok' },
  { value: 30, color: 'status-critical' },
];

const GradientCharts = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <Chart
        type="bar"
        color={gradient}
        values={[
          [10, 20],
          [20, 30],
          [30, 15],
        ]}
      />
      <Chart type="line" color={gradient} values={[20, 30, 15]} />
      <Chart
        type="area"
        color={gradient}
        values={[{ value: [10, 20] }, { value: [20, 30] }, { value: [30, 15] }]}
      />
      <Chart
        type="point"
        color={gradient}
        values={[
          [10, 20],
          [20, 30],
          [30, 15],
        ]}
        round
      />
    </Box>
  </Grommet>
);

storiesOf('Chart', module).add('Gradient', () => <GradientCharts />);
