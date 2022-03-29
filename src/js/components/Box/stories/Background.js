import React from 'react';

import { Box, Text } from 'grommet';

export const BackgroundBox = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box pad="small" gap="small" align="start">
    <Box
      pad="small"
      background={{ color: 'brand', opacity: true }}
      elevation="large"
    >
      brand opacity
    </Box>
    <Box pad="small" background="brand" elevation="large">
      brand
    </Box>
    <Box pad="small" background={{ color: 'brand' }} elevation="large">
      brand object
    </Box>
    <Box
      pad="small"
      background={{
        image:
          'url(https://images.unsplash.com/photo-1487088678257-3a541e6e3922?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2167&q=80)',
        opacity: 'strong',
      }}
    >
      image
    </Box>
    <Box
      pad="small"
      background={{
        color: 'accent-2',
        image:
          'url(https://images.unsplash.com/photo-1487088678257-3a541e6e3922?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2167&q=80)',
      }}
    >
      image + color
    </Box>
    <Box background="dark-1" pad="medium">
      <Box background="#FFFFFF08" pad="small">
        low opacity on dark background
      </Box>
    </Box>
    <Box background="light-5" pad="medium">
      <Box background="#11111108" pad="small">
        low opacity on light background
      </Box>
    </Box>
    <Box background={{ color: 'background', dark: true }} pad="medium">
      <Text color="brand">force dark background</Text>
    </Box>
    <Box background="dark-1" pad="medium">
      <Box background={{ color: 'background', dark: false }} pad="medium">
        <Text color="brand">force light background</Text>
      </Box>
    </Box>
    <Box
      background={{
        color: { dark: 'darkgrey', light: 'lightgrey' },
        dark: true,
      }}
      pad="medium"
    >
      <Text color="brand">force dark background with color as object</Text>
    </Box>
    <Box background="dark-1" pad="medium">
      <Box
        background={{
          color: { dark: 'darkgrey', light: 'lightgrey' },
          dark: false,
        }}
        pad="medium"
      >
        <Text color="brand">force light background with color as object</Text>
      </Box>
    </Box>
  </Box>
  // </Grommet>
);

BackgroundBox.storyName = 'Background';

export default {
  title: 'Layout/Box/Background',
};
