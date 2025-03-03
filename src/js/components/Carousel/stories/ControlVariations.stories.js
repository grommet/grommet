import React from 'react';
import { Attraction, Car, TreeOption, Cloud, Amazon } from 'grommet-icons';
import { Box, Carousel, Text } from 'grommet';

export const ControlVariations = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={grommet}>
  <Box
    direction="row"
    gap="medium"
    pad="small"
    align="center"
    justify="center"
    fill="horizontal"
  >
    <Box align="center" gap="small" justify="center">
      <Text size="small">
        Continuous slides with both arrow and selector controls
      </Text>
      <Carousel wrap height="medium" width="medium">
        <Box fill align="center" justify="center" background="light-1">
          <Attraction size="xlarge" />
        </Box>
        <Box fill align="center" justify="center" background="black">
          <TreeOption size="xlarge" />
        </Box>
        <Box fill align="center" justify="center" background="light-3">
          <Car size="xlarge" />
        </Box>
        <Box fill align="center" justify="center" background="brand">
          <Cloud size="xlarge" />
        </Box>
        <Box fill align="center" justify="center">
          <Amazon size="xlarge" />
        </Box>
      </Carousel>
    </Box>
    <Box gap="small" align="center" justify="center">
      <Text size="small">With selector controls and initial child set</Text>
      <Carousel
        height="medium"
        width="medium"
        initialChild={2}
        controls="selectors"
      >
        <Box fill align="center" justify="center" background="pink">
          <Attraction size="xlarge" />
        </Box>
        <Box fill align="center" justify="center" background="black">
          <TreeOption size="xlarge" />
        </Box>
        <Box fill align="center" justify="center" background="light-2">
          <Car size="xlarge" />
        </Box>
        <Box fill align="center" justify="center" background="light-1">
          <Cloud size="xlarge" />
        </Box>
        <Box fill align="center" justify="center">
          <Amazon size="xlarge" />
        </Box>
      </Carousel>
    </Box>
    <Box align="center" gap="small" justify="center">
      <Text size="small">With arrow controls and initial child set</Text>
      <Carousel
        height="medium"
        width="medium"
        controls="arrows"
        initialChild={3}
      >
        <Box fill align="center" justify="center" background="pink">
          <Attraction size="xlarge" />
        </Box>
        <Box fill align="center" justify="center" background="black">
          <TreeOption size="xlarge" />
        </Box>
        <Box fill align="center" justify="center" background="light-1">
          <Car size="xlarge" />
        </Box>
        <Box fill align="center" justify="center" background="light-2">
          <Cloud size="xlarge" />
        </Box>
        <Box fill align="center" justify="center">
          <Amazon size="xlarge" />
        </Box>
      </Carousel>
    </Box>
  </Box>
  // </Grommet>
);

ControlVariations.storyName = 'Control variations';

export default {
  title: 'Media/Carousel/Control variations',
};
