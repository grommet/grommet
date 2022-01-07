import React from 'react';

import { Anchor, Box, Paragraph } from 'grommet';

const InlineAnchor = () => (
  <Box align="center" pad="large">
    <Paragraph>
      This is <Anchor label="an inline link" href="#" /> with surrounding text.
    </Paragraph>
  </Box>
);

export const Inline = () => <InlineAnchor />;

export default {
  title: 'Controls/Anchor/Inline',
};
