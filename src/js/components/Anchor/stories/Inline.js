import React from 'react';

import { Anchor, Box, Grommet, Paragraph } from 'grommet';
import { grommet } from 'grommet/themes';

export const Inline = () => {
  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <Paragraph>
          This is <Anchor label="an inline link" href="#" /> with surrounding
          text.
        </Paragraph>
      </Box>
    </Grommet>
  );
};
