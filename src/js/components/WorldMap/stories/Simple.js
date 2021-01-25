import React from 'react';

import { Box, Grommet, WorldMap } from 'grommet';
import { grommet } from 'grommet/themes';

export const Simple = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <WorldMap />
    </Box>
  </Grommet>
);

Simple.parameters = {
  // chromatic disabled because snapshot is the same as SelectPlace
  chromatic: { disable: true },
};

export default {
  title: 'Visualizations/WorldMap/Simple',
};
