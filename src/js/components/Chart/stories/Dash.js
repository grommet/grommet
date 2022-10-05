import React from 'react';

import { Box, Chart } from 'grommet';

export const Dash = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={grommet}>
  <Box align="center" pad="large" gap="large">
    <Chart type="line" dash values={[20, 30, 15]} />
    <Chart type="line" dash round values={[20, 30, 15]} />
    <Chart type="line" dash thickness="xsmall" values={[20, 30, 15]} />
    <Chart type="line" dash round thickness="xsmall" values={[20, 30, 15]} />

    <Chart
      type="bar"
      dash
      values={[
        [10, 20],
        [20, 30],
        [30, 15],
      ]}
    />
  </Box>
  // </Grommet>
);

export default {
  title: 'Visualizations/Chart/Dash',
};
