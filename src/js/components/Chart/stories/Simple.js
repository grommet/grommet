import React from 'react';
import { storiesOf } from '@storybook/react';

import { MnetUIBase, Box, Chart } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

const BarChart = () => (
  <MnetUIBase theme={mnet}>
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
  </MnetUIBase>
);

const LineChart = () => (
  <MnetUIBase theme={mnet}>
    <Box align="center" pad="large">
      <Chart type="line" values={[20, 30, 15]} />
    </Box>
  </MnetUIBase>
);

const AreaChart = () => (
  <MnetUIBase theme={mnet}>
    <Box align="center" pad="large">
      <Chart
        type="area"
        values={[{ value: [10, 20] }, { value: [20, 30] }, { value: [30, 15] }]}
      />
    </Box>
  </MnetUIBase>
);

const PointChart = () => (
  <MnetUIBase theme={mnet}>
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
  </MnetUIBase>
);

storiesOf('Chart', module)
  .add('Bar', () => <BarChart />)
  .add('Line', () => <LineChart />)
  .add('Area', () => <AreaChart />)
  .add('Point', () => <PointChart />);
