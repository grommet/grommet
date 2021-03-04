import React from 'react';

import { Box, Calendar, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

export const Range = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <Calendar date={[['2020-04-02', '2020-04-08']]} range />
    </Box>
  </Grommet>
);

Range.storyName = 'Range2';

export default {
  title: 'Visualizations/Calendar/Range2',
};
