import React from 'react';

import { Grommet, Paragraph } from 'grommet';
import { deepMerge } from 'grommet/utils';
import { grommet } from 'grommet/themes';

const customTheme = deepMerge(grommet, {
  paragraph: {
    font: {
      family: 'Comic Sans MS',
    },
  },
});

export const Themed = () => (
  <Grommet theme={customTheme}>
    <Paragraph>
      The font family for this paragraph is being defined by a custom theme.
    </Paragraph>
  </Grommet>
);

// disabling chromatic because snapshot doesn't capture font
Themed.story = {
  parameters: {
    chromatic: { disable: true },
  },
};
