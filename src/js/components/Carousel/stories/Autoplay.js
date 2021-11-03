import React from 'react';
import { Attraction, Car, TreeOption } from 'grommet-icons';

import { Text, Box } from 'grommet';
import { Carousel } from '../Carousel';

export const Autoplay = () => (
  <Box gap="medium" align="center" pad="large">
    <Text size="small">
      The Carousel slides will transition every 3 seconds
    </Text>
    <Carousel controls={false} play={3000}>
      <Box pad="xlarge" background="accent-1">
        <Attraction size="xlarge" />
      </Box>
      <Box pad="xlarge" background="accent-2">
        <TreeOption size="xlarge" />
      </Box>
      <Box pad="xlarge" background="accent-3">
        <Car size="xlarge" />
      </Box>
    </Carousel>
  </Box>
);

export default {
  title: 'Media/Carousel/Autoplay',
};
