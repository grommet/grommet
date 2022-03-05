import React from 'react';

import { Box, DataChart } from 'grommet';

export const Placeholder = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={grommet}>
  <Box align="center" justify="start" pad="large">
    {/* <DataChart
      data={[
        { date: '2022-01-02' },
        { date: '2022-02-02' },
        { date: '2022-03-02' },
      ]}
      series={['date', 'percent']}
      bounds={{ y: [0, 100] }}
      axis
      guide
      placeholder="no data available"
    /> */}
    <DataChart
      data={[
        { date: '2022-01-02' },
        { date: '2022-02-02' },
        { date: '2022-03-02' },
      ]}
      series={['date', 'percent']}
      bounds={{ y: [0, 100] }}
      placeholder="no data"
    />
  </Box>
  // </Grommet>
);

export default {
  title: 'Visualizations/DataChart/Placeholder',
};
