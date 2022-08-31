import React from 'react';

import { Box, WorldMap } from 'grommet';

export const Color = () => (
  <Box align="center" pad="large">
    <WorldMap color="graph-1" />
  </Box>
);

Color.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Visualizations/WorldMap/Color',
};
