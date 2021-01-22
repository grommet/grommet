import React from 'react';

import { Box, Grommet, WorldMap } from 'grommet';
import { grommet } from 'grommet/themes';

export const Color = () => {
  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <WorldMap color="graph-1" />
      </Box>
    </Grommet>
  );
};

Color.story = {
  parameters: {
    chromatic: { disable: true },
  },
};
