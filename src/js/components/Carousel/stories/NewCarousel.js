import React from 'react';
import { Attraction, Car, TreeOption, Cloud, Amazon } from 'grommet-icons';
import { Box, Text } from 'grommet';

import { NewCarousel } from '../NewCarousel';

export const Simple = () => (
  <Box direction="row" align="center" justify="center" fill="horizontal">
    <Box
      height="500px"
      width="500px"
      align="center"
      gap="small"
      justify="center"
    >
      <Text size="small">Carousel on white background</Text>
      <NewCarousel height="400px" width="400px">
        <Box fill align="center" justify="center" background="accent-1">
          <Attraction size="xlarge" />
        </Box>
        <Box fill align="center" justify="center" background="black">
          <TreeOption size="xlarge" />
        </Box>
        <Box fill align="center" justify="center" background="accent-3">
          <Car size="xlarge" />
        </Box>
        <Box fill align="center" justify="center" background="accent-4">
          <Cloud size="xlarge" />
        </Box>
        <Box fill align="center" justify="center">
          <Amazon size="xlarge" />
        </Box>
      </NewCarousel>
    </Box>
    <Box
      height="500px"
      width="500px"
      gap="small"
      align="center"
      justify="center"
      background="lavender"
    >
      <Text size="small">Carousel light mode on light background</Text>
      <NewCarousel
        height="400px"
        width="400px"
        initialChild={3}
        background="lavender"
      >
        <Box fill align="center" justify="center" background="accent-1">
          <Attraction size="xlarge" />
        </Box>
        <Box fill align="center" justify="center" background="black">
          <TreeOption size="xlarge" />
        </Box>
        <Box fill align="center" justify="center" background="accent-3">
          <Car size="xlarge" />
        </Box>
        <Box fill align="center" justify="center" background="accent-4">
          <Cloud size="xlarge" />
        </Box>
        <Box fill align="center" justify="center">
          <Amazon size="xlarge" />
        </Box>
      </NewCarousel>
    </Box>
    <Box
      height="500px"
      width="500px"
      align="center"
      gap="small"
      justify="center"
      background="#263040"
    >
      <Text size="small">Carousel dark mode on dark background</Text>
      <NewCarousel height="400px" width="400px" dark initialChild={2}>
        <Box fill align="center" justify="center" background="accent-1">
          <Attraction size="xlarge" />
        </Box>
        <Box fill align="center" justify="center" background="black">
          <TreeOption size="xlarge" />
        </Box>
        <Box fill align="center" justify="center" background="accent-3">
          <Car size="xlarge" />
        </Box>
        <Box fill align="center" justify="center" background="accent-4">
          <Cloud size="xlarge" />
        </Box>
        <Box fill align="center" justify="center">
          <Amazon size="xlarge" />
        </Box>
      </NewCarousel>
    </Box>
  </Box>
);

export default {
  title: 'Media/Carousel/New Carousel/Simple',
};
