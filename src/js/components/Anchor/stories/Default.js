import React from 'react';
import { Anchor, Box, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

export const Default = () => {
  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <Anchor href="#">Link</Anchor>
      </Box>
    </Grommet>
  );
};
