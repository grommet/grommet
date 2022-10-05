import React from 'react';

import { Box, Grommet, Notification } from 'grommet';

import { deepMerge } from 'grommet/utils';
import { grommet, ThemeType } from 'grommet/themes';
import { CircleQuestion } from 'grommet-icons';

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
      border: { color: '#000000', size: 'large' },
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
      color: '#001172',
    },
    message: {
      // any TextProps
      color: {
        light: '#001172',
        dark: '#340057',
      },
    },
    close: {
      color: '#e0ffcc',
    },
    unknown: {
      icon: CircleQuestion,
      background: '#87a200',
    },
  },
});

export const ThemedNotification = () => (
  <Grommet theme={customTheme}>
    <Box pad="large" justify="center" gap="large">
      <Notification
        status="unknown"
        title="My Custom Notification"
        message="This notification has a custom theme applied."
        onClose={() => {}}
      />
    </Box>
  </Grommet>
);

ThemedNotification.storyName = 'Themed Notification';

export default {
  title: 'Visualizations/Notification/Custom Themed/Themed Notification',
};
