import React, { useState } from 'react';

import { Box, Button, Heading, Grommet, Text } from 'grommet';

export const Custom = () => {
  const customTheme = {
    skeleton: {
      colors: {
        light: ['#a2a8a8', '#adb9ba'],
      },
      round: 'xsmall',
    },
    button: {
      skeleton: {
        round: 'xsmall',
      },
    },
    heading: {
      skeleton: {
        width: 'medium',
      },
    },
    text: {
      skeleton: {
        colors: {
          light: ['#c5d9d9', '#b2d6d6'],
        },
      },
    },
  };

  const [skeleton, setSkeleton] = useState(true);

  return (
    <Grommet theme={customTheme}>
      <Box pad="large" gap="medium">
        <Button
          alignSelf="start"
          label="Toggle skeleton"
          onClick={() => setSkeleton(!skeleton)}
        />
        <Box gap="small" pad="small" align="start" skeleton={skeleton}>
          <Heading level={1}>Heading 1</Heading>
          <Text>text</Text>
          <Heading level={2}>Heading 2</Heading>
          <Button alignSelf="end" label="button" />
          <Text>text</Text>
        </Box>
      </Box>
    </Grommet>
  );
};

export default {
  title: 'Visualizations/Skeleton/Custom Themed/Custom',
};
