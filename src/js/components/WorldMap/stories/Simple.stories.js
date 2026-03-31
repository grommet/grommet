import React from 'react';

import { Box, WorldMap } from 'grommet';

export const Simple = () => (
  <Box align="center" pad="large">
    <WorldMap />
  </Box>
);

Simple.parameters = {
  // chromatic disabled because snapshot is the same as SelectPlace
  chromatic: { disable: true },
};

export default {
  title: 'Visualizations/WorldMap/Simple',
};
