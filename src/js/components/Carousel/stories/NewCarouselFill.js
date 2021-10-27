import React from 'react';
import { Attraction, Car, TreeOption, Cloud, Amazon } from 'grommet-icons';
import { Grommet, Text, Box } from 'grommet';

import { NewCarousel } from '../NewCarousel';

export const Fill = () => (
  <Grommet>
    <Box align="center" border gap="xsmall" width="900px" height="900px">
      <Text>Outer Container 900 x 900</Text>
      <NewCarousel fill initialChild={3}>
        <Box fill align="center" justify="center" background="accent-1">
          <Attraction size="xlarge" />
        </Box>
        <Box fill align="center" justify="center" background="accent-2">
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
  </Grommet>
);

export default {
  title: 'Media/Carousel/New Carousel/Fill',
};
