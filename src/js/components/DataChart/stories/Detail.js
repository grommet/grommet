import React from 'react';

import { Box, DataChart } from 'grommet';

const data = [];
for (let i = 1; i < 8; i += 1) {
  const v = Math.sin(i / 2.0);
  data.push({
    date: `2020-07-${((i % 30) + 1).toString().padStart(2, 0)}`,
    percent: Math.abs(v * 100),
  });
}

export const Detail = () => (
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
      ]}
      chart="percent"
      detail
      axis={{ x: { property: 'date', granularity: 'medium' } }}
    />
  </Box>
  // </Grommet>
);

export default {
  title: 'Visualizations/DataChart/Detail',
};
