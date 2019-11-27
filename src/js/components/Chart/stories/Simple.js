import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, Chart } from 'grommet';
import { grommet } from 'grommet/themes';

const BarChart = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <Chart
        type="bar"
        values={[
          [10, 20],
          [20, 30],
          [30, 15],
        ]}
      />
    </Box>
  </Grommet>
);

const LineChart = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <Chart type="line" values={[20, 30, 15]} />
    </Box>
  </Grommet>
);

const AreaChart = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <Chart
        type="area"
        values={[{ value: [10, 20] }, { value: [20, 30] }, { value: [30, 15] }]}
      />
    </Box>
  </Grommet>
);

const PointChart = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <Chart
        type="point"
        values={[
          [10, 20],
          [20, 30],
          [30, 15],
        ]}
      />
      <Chart
        type="point"
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

storiesOf('Chart', module)
  .add('Bar', () => <BarChart />)
  .add('Line', () => <LineChart />)
  .add('Area', () => <AreaChart />)
  .add('Point', () => <PointChart />);
