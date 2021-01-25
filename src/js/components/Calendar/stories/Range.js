import React from 'react';

import { Box, Calendar, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

export const Range = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <Calendar dates={[['2020-04-03', '2020-04-08']]} range />
    </Box>
  </Grommet>
);

export default {
  title: 'Visualizations/Calendar/Range',
};
