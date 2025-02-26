import React from 'react';

import { Box, Button, Grommet, Tip, Paragraph } from 'grommet';
import { ThemeType } from 'grommet/themes';

const customTheme: ThemeType = {
  global: {
    font: {
      family: `-apple-system, BlinkMacSystemFont`,
    },
  },
  tip: {
    drop: {
      background: { color: 'light-1' },
      margin: { vertical: 'small' },
      round: 'xsmall',
      elevation: 'large',
    },
    content: {
      elevation: 'none',
      background: 'none',
      pad: 'small',
    },
  },
};

export const Themed = () => (
  <Grommet full theme={customTheme}>
    <Box align="center" justify="center" fill>
      <Paragraph textAlign="center">
        By default, the Tips content is the driver of the styles. In this themed
        example, we are showing how Drop could be the main driver of the styles
        instead of the content.
      </Paragraph>
      <Tip content="action info">
        <Button label="action" primary />
      </Tip>
    </Box>
  </Grommet>
);

Themed.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Controls/Tip/Custom Themed/Themed',
};
