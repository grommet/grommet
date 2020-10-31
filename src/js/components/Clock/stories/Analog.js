import React from 'react';

import { Box, Grommet, Clock } from 'grommet';
import { grommet } from 'grommet/themes';

export const Analog = () => (
  <Grommet theme={grommet}>
    <Box align="center" justify="start" pad="large">
      <Clock type="analog" />
    </Box>
  </Grommet>
);

Analog.story = {
  parameters: {
    chromatic: { disable: true },
  },
};
