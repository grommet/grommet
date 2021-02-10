import React from 'react';
import { Attraction, Car, TreeOption } from 'grommet-icons';

import { Grommet, Box, Carousel } from 'grommet';

export const Initial = () => (
  <Grommet>
    <Box align="center" pad="large">
      <Carousel initialChild={1}>
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

Initial.storyName = 'Initial child';

export default {
  title: `Media/Carousel/Initial child`,
};
