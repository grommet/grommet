import React from 'react';
import { Attraction, Car, TreeOption } from 'grommet-icons';

import { Grommet, Box, Carousel } from 'grommet';

export const NoControls = () => (
  <Grommet>
    <Box align="center" pad="large">
      <Carousel controls={false} play={1500}>
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
  </Grommet>
);

NoControls.storyName = 'Without controls';

export default {
  title: 'Media/Carousel/Without controls',
};
