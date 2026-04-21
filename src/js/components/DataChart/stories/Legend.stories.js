import React from 'react';

import { Box, DataChart } from 'grommet';

const data = [];
for (let i = 1; i < 8; i += 1) {
  const v = Math.sin(i / 2.0);
  data.push({
    date: `2020-07-${((i % 30) + 1).toString().padStart(2, 0)}`,
    percent: Math.abs(v * 100),
    amount: Math.round(Math.abs(v * 50)),
    inverse: 100 - Math.round(Math.abs(v * 50)),
  });
}

export const Legend = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={grommet}>
  <Box align="center" justify="start" pad="large">
    <DataChart
      data={data}
      series={[
        { property: 'date', label: 'Date' },
        {
          property: 'percent',
          label: 'Percent',
          render: (value) => `${Math.round(value)}%`,
        },
        {
          property: 'amount',
          label: 'Amount',
        },
        {
          property: 'inverse',
          label: 'Inverse',
        },
      ]}
      chart={[
        'percent',
        {
          property: 'amount',
          type: 'line',
          thickness: 'xsmall',
          dash: true,
          round: true,
        },
        {
          property: 'inverse',
          type: 'point',
          point: 'star',
          thickness: 'medium',
        },
      ]}
      legend
      detail
      axis={{ x: { property: 'date', granularity: 'medium' } }}
    />
  </Box>
  // </Grommet>
);

export default {
  title: 'Visualizations/DataChart/Legend',
};
