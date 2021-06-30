import React from 'react';

import { Grommet, Box, Meter } from 'grommet';
import { grommet } from 'grommet/themes';

export const Pie = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <Meter
        type="pie"
        background="light-2"
        size="small"
        values={[{ value: 70 }, { value: 20 }, { value: 10 }]}
      />
    </Box>
  </Grommet>
);

export default {
  title: 'Visualizations/Meter/Pie',
};
