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
      pad: { horizontal: '200px', vertical: '100px' },
      background: '#aaccff',
    },
    iconContainer: {
      pad: '10px',
    },
    textContainer: {
      gap: '25px',
    },
    title: {
      color: '#0223df',
    },
    message: {
      color: {
        light: '#0223df',
        dark: '#6101a0',
      },
    },
    close: {
      icon: DisabledOutline,
    },
    unknown: {
      color: '#b0ff7b',
    },
  },
});

export const TSStatus = () => (
  <Grommet theme={customTheme}>
    <Box pad="large" justify="center" gap="large">
      <Box gap="xsmall">
        <Text size="medium">Default (No status prop)</Text>
        <Notification
          title="Status Title"
          message="This is an example of message text"
        />
      </Box>
      <Box gap="xsmall">
        <Text size="medium">Normal</Text>
        <Notification
          status="normal"
          title="Status Title"
          message="This is an example of message text"
        />
      </Box>
      <Box gap="xsmall">
        <Text size="medium">Warning</Text>
        <Notification
          status="warning"
          title="Status Title"
          message="This is an example of message text"
        />
      </Box>
      <Box gap="xsmall">
        <Text size="medium">Critical</Text>
        <Notification
          status="critical"
          title="Status Title"
          message="This is an example of message text"
        />
      </Box>
      <Box gap="xsmall">
        <Text size="medium">Unknown</Text>
        <Notification
          status="unknown"
          title="Status Title"
          message="This is an example of message text"
        />
      </Box>
    </Box>
  </Grommet>
);

TSStatus.storyName = 'TS-Status';

export default {
  title: 'Visualizations/Notification/TS-Status',
};
