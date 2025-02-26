import React from 'react';

import { Box, Paragraph } from 'grommet';

const text = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua.
`;

export const Maxlines = () => (
  <Box fill align="center" justify="center" pad="large">
    <Box border width="small" pad={{ horizontal: 'small' }}>
      <Paragraph maxLines={3}>{text}</Paragraph>
    </Box>
    <Paragraph maxLines={3}>{text}</Paragraph>
  </Box>
);

export default {
  title: 'Type/Paragraph/Maxlines',
};
