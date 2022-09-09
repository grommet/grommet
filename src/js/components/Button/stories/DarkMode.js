import React from 'react';

import { Box, Button, Grommet } from 'grommet';
import { deepMerge } from 'grommet/utils';
import { hpe } from 'grommet-theme-hpe';

const myTheme = deepMerge(hpe, {
  button: {
    'background-contrast': {
      background: 'background-contrast',
      color: 'text-strong',
    },
    active: {
      'background-contrast': {
        color: 'text-strong',
      },
    },
  },
});

export const DarkMode = () => (
  <Grommet theme={myTheme}>
    <Box
      background={{ dark: true, color: 'background' }}
      pad="large"
      gap="medium"
      align="start"
    >
      <Button label="Test button" kind="background-contrast" />
      <Button label="Active Test button" kind="background-contrast" active />
    </Box>
    <Box pad="large" gap="medium" align="start">
      <Button label="Test button" kind="background-contrast" />
      <Button label="Active Test button" kind="background-contrast" active />
    </Box>
  </Grommet>
);

export default {
  title: 'Controls/Button/DarkMode',
};
