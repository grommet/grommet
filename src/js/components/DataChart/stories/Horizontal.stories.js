import React from 'react';

import { Box, DataChart } from 'grommet';

const data = [];
for (let i = 1; i < 8; i += 1) {
  const v = Math.sin(i / 2.0);
  data.push({
    percent: Math.abs(v * 100),
    label: `Label ${i}`,
  });
}

export const Horizontal = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={grommet}>
  <Box align="center" justify="start" pad="large">
    <DataChart
      data={data}
      series={[
        { property: 'label', render: (label) => label },
        { property: 'percent', suffix: '%' },
      ]}
      direction="horizontal"
      size="medium"
      axis={{
        x: { granularity: 'fine' },
        y: { property: 'label', granularity: 'fine' },
      }}
      guide={{ x: { granularity: 'fine' }, y: { granularity: 'fine' } }}
    />
  </Box>
  // </Grommet>
);

export default {
  title: 'Visualizations/DataChart/Horizontal',
};
