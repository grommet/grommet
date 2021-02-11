import React from 'react';

import { Box, Grommet, WorldMap } from 'grommet';
import { grommet } from 'grommet/themes';

export const Color = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <WorldMap color="graph-1" />
    </Box>
  </Grommet>
);

Color.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Visualizations/WorldMap/Color',
};
