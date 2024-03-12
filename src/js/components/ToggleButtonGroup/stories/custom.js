import React from 'react';

import { Grommet, Box, ToggleButtonGroup } from 'grommet';
import { hpe } from 'grommet-theme-hpe';
import { deepMerge } from 'grommet/utils';

const theme = deepMerge(hpe, {
  radioButton: {
    container: {
      extend: () => `
          padding: none;
        `,
    },
    extend: () => `
          padding: none;
        `,
  },
  radioButtonGroup: {
    container: {
      gap: 'none',
      margin: {
        vertical: 'none',
      },
    },
  },
});

export const ThemedToggleButtonGroup = () => (
  <Grommet theme={theme}>
    <Box align="center" pad="large" gap="large">
      <ToggleButtonGroup
        exclusive
        options={['button1', 'button2', 'button3']}
      />
      <ToggleButtonGroup
        pad="none"
        options={['button1', 'button2', 'button3']}
      />
    </Box>
  </Grommet>
);

ThemedToggleButtonGroup.storyName = 'Theme';

export default {
  title: 'Input/ToggleButtonGroup/Theme',
};
