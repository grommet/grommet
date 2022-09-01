import React from 'react';

import { Grommet, Box, Text } from 'grommet';

const myTheme = {
  global: {
    backgrounds: {
      'image-1': `url(https://images.unsplash.com/photo-1620497772559-b65fc1d1ccf7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80)`,
      'image-2': {
        dark: `url(https://images.unsplash.com/photo-1614292253389-bd2c1f89cd0e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80)`,
        light: `url(https://images.unsplash.com/photo-1603484477859-abe6a73f9366?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80)`,
      },
      'gradient-1': `linear-gradient(
        hsl(240deg 90% 55%) 0%,
        hsl(341deg 90% 55%) 50%,
        hsl(60deg 90% 55%) 100%)`,
      hex: '#000',
      'color-1': 'brand',
      'fancy-1': {
        color: 'brand',
        opacity: true,
        // image: 'image-1',
      },
      'fancy-2': {
        color: 'color-1',
        opacity: true,
        // image: 'image-1',
      },
    },
  },
};

export const BackgroundBoxTemp = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  <Grommet theme={myTheme}>
    <Box pad="small" gap="small" align="start">
      <Text size="xlarge">Strings</Text>
      {/* <Box background="accent-3" pad="medium">
        <Text weight="bold">background color</Text>
      </Box>
      <Box background="color-1" pad="medium">
        <Text weight="bold">background color</Text>
      </Box> */}
      {/* <Box background="#458FFA" pad="medium">
        <Text weight="bold">background hex</Text>
      </Box>
      <Box background="hex" pad="medium">
        <Text weight="bold">background hex from theme</Text>
      </Box>
      <Box
        background="url(https://images.unsplash.com/photo-1614292253389-bd2c1f89cd0e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80)"
        pad="medium"
      >
        <Text weight="bold">background image</Text>
      </Box> */}
      {/* <Box background="image-2" pad="medium">
        <Text weight="bold">background image from theme</Text>
      </Box>
      <Box
        background={`linear-gradient(
          90deg,
          hsl(200deg 100% 65%) 0%,
          hsl(230deg 80% 70%) 40%,
          hsl(280deg 90% 50%) 100%)`}
        pad="medium"
      >
      <Text weight="bold">background gradient</Text>
      </Box> */}
      <Text size="xlarge">Objects</Text>
      {/* <Box background={{ color: 'accent-1' }} pad="medium">
        <Text weight="bold">background object - color</Text>
      </Box>
      <Box background={{ color: 'color-1' }} pad="medium">
        <Text weight="bold">background object - color</Text>
      </Box> */}
      <Box background="fancy-1" pad="medium">
        <Text weight="bold">background theme object</Text>
      </Box>
      <Box background="fancy-2" pad="medium">
        <Text weight="bold">background theme object</Text>
      </Box>
      {/* <Box
        background={{ image: 'image-1', color: 'red', opacity: true }}
        pad="medium"
      >
        <Text weight="bold">background object - image, color, opacity</Text>
      </Box>
      <Box background={{ image: 'image-1', clip: 'text' }} pad="medium">
        <Text weight="bold">clip text</Text>
      </Box>
      <Box background={{ image: 'gradient-1', rotate: -45 }} pad="medium">
        <Text weight="bold">rotate background gradient</Text>
      </Box> */}
    </Box>
  </Grommet>
);

BackgroundBoxTemp.storyName = 'Background Temp';

export default {
  title: 'Layout/Box/Background Temp',
};
