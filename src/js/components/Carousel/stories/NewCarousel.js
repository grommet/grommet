import React from 'react';
import { Attraction, Car, TreeOption, Cloud, Amazon } from 'grommet-icons';
import { Grommet, Box } from 'grommet';

import { NewCarousel } from '../NewCarousel';

export const Simple = () => (
  <Grommet>
    <Box align="center" pad="large" background="white">
      <NewCarousel height="600px" width="600px">
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
  </Grommet>
);

export default {
  title: 'Media/Carousel/New Carousel/Simple',
};
