import React from 'react';
import { Attraction, Car, TreeOption, Cloud, Amazon } from 'grommet-icons';
import { Box, Text } from 'grommet';
import { Carousel } from '../Carousel';

export const ControlVariations = () => (
  <Box direction="row" align="center" justify="center" fill="horizontal">
    <Box
      height="500px"
      width="500px"
      align="center"
      gap="small"
      justify="center"
    >
      <Text size="small">
        Continuous slides with both arrow and selector controls
      </Text>
      <Carousel continuous height="400px" width="400px">
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
      </Carousel>
    </Box>
    <Box
      height="500px"
      width="500px"
      gap="small"
      align="center"
      justify="center"
      background="lavender"
    >
      <Text size="small">With selector controls and initial child set</Text>
      <Carousel
        height="400px"
        width="400px"
        initialChild={2}
        controls="selectors"
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
      </Carousel>
    </Box>
    <Box
      height="500px"
      width="500px"
      align="center"
      gap="small"
      justify="center"
      background="light-3"
    >
      <Text size="small">With arrow controls and initial child set</Text>
      <Carousel height="400px" width="400px" controls="arrows" initialChild={3}>
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
      </Carousel>
    </Box>
  </Box>
);

ControlVariations.storyName = 'Control variations';

export default {
  title: 'Media/Carousel/Control variations',
};
