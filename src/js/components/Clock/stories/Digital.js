import React from 'react';

import { Box, Grommet, Clock } from 'grommet';
import { grommet } from 'grommet/themes';

export const Digital = () => (
  <Grommet theme={grommet}>
    <Box align="center" justify="start" pad="large">
      <Clock type="digital" />
    </Box>
  </Grommet>
);

Digital.story = {
  parameters: {
    chromatic: { disable: true },
  },
};
