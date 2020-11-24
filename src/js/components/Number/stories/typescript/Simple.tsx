import React from 'react';

import { Box, Grommet, Number } from 'grommet';
import { grommet } from 'grommet/themes';

export const Simple = () => (
  <Grommet theme={grommet}>
    <Box align="center" justify="center" pad="medium" gap="medium">
      {['small', 'medium', 'large', 'xlarge'].map(size => (
        <Number value={27} units="GB" size={size} />
      ))}
    </Box>
  </Grommet>
);
