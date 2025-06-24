import React from 'react';

import { Box, DataChart } from 'grommet';

const data = [];
for (let i = 1; i <= 7; i += 1) {
  const v = Math.sin(i / 2.0);
  const digits = ((i % 12) + 1).toString().padStart(2, 0);
  data.push({
    // explore variations in date format by changing the xAxis key to
    // the time period you are interested in
    second: `2020-05-15T08:04:${digits}`,
    minute: `2020-05-15T08:${digits}:00`,
    hour: `2020-05-15T${digits}:00:00`,
    day: `2020-05-${digits}`,
    month: `2020-${digits}-15`,
    year: `20${digits}-01-15`,
    // explore variations in yAxis value handling by changing the chart key
    // to one of these
    percent: Math.abs(v * 100), // make yAxis suffix '%'
    amount: i * 111111, // make yAxis prefix '$'
  });
}

export const Axis = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={grommet}>
  <Box align="center" justify="start" pad="large">
    <DataChart
      data={data}
      series={['day', { property: 'percent', suffix: '%' }]}
      chart="percent"
      axis={{
        x: { property: 'day', granularity: 'medium' },
        y: { property: 'percent', granularity: 'medium' },
      }}
    />
  </Box>
  // </Grommet>
);

export default {
  title: 'Visualizations/DataChart/Axis',
};
