import React from 'react';

import { Anchor, Box, Paragraph } from 'grommet';

const SimpleAnchor = () => (
  <Box gap="medium" align="center" pad="large">
    <Anchor href="#">Link</Anchor>
    <Anchor disabled label="Disabled Anchor" />
    <Paragraph margin="none">
      This is <Anchor label="an inline link" href="#" /> with surrounding text.
    </Paragraph>
  </Box>
);

export const Simple = () => <SimpleAnchor />;
Simple.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Controls/Anchor/Simple',
};
