import React from 'react';

import { Anchor, Box, Grommet, Paragraph } from 'grommet';
import { grommet } from 'grommet/themes';

const InlineAnchor = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <Paragraph>
        This is <Anchor label="an inline link" href="#" /> with surrounding
        text.
      </Paragraph>
    </Box>
  </Grommet>
);

export const Inline = () => <InlineAnchor />;

export default {
  title: 'Controls/Anchor/Inline',
};
