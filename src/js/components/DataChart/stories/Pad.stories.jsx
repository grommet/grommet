import React from 'react';

import { Box, DataChart } from 'grommet';

const data = [];
for (let i = 1; i < 3; i += 1) {
  const v = Math.sin(i / 2.0);
  data.push({
    percent: Math.abs(v * 100),
  });
}

export const Pad = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={grommet}>
  <Box align="center" justify="start" pad="large">
    <DataChart
      bounds={{ y: [0, 100] }}
      guide
      detail
      pad={{ horizontal: 'xlarge' }}
      data={data}
      series={['percent', {}]}
      chart={[{ property: 'percent', thickness: 'medium' }]}
    />
  </Box>
  // </Grommet>
);

export default {
  title: 'Visualizations/DataChart/Pad',
};
