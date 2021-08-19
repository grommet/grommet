import React from 'react';

import { Box, Grommet, Notification, Text } from 'grommet';

import { deepMerge } from 'grommet/utils';
import { grommet, ThemeType } from 'grommet/themes';
import { DisabledOutline } from 'grommet-icons';

// Type annotations can only be used in TypeScript files.
// Remove ': ThemeType' if you are not using Typescript.
const customTheme: ThemeType = deepMerge(grommet, {
  global: {
    font: {
      family: 'Arial',
    },
  },
  notification: {
    container: {
      // any BoxProps
      pad: { horizontal: 'large', vertical: '36px' },
      background: '#aaccff',
      round: 'small',
    },
    iconContainer: {
      // any BoxProps
      justify: 'center',
      align: 'center',
    },
    textContainer: {
      // any BoxProps
      gap: '25px',
    },
    title: {
      // any TextProps
      color: '#0223df',
    },
    message: {
      // any TextProps
      color: {
        light: '#0223df',
        dark: '#6101a0',
      },
    },
    close: {
      icon: DisabledOutline,
    },
    undefined: {
      color: '#b0ff7b',
    },
  },
});

export const Themed = () => (
  <Grommet theme={customTheme}>
    <Box pad="large" justify="center" gap="large">
      <Box gap="xsmall">
        <Text size="medium">Default (No status prop)</Text>
        <Notification
          title="My Custom Notification"
          message="This notification has a custom theme applied."
        />
      </Box>
    </Box>
  </Grommet>
);

Themed.storyName = 'Themed';

export default {
  title: 'Visualizations/Notification/Themed',
};
