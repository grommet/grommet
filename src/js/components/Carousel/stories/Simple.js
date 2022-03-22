import React from 'react';
import { Attraction, Car, TreeOption } from 'grommet-icons';

import { Box, Carousel } from 'grommet';

export const Simple = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box align="center" pad="large">
    <Carousel>
      <Box pad="xlarge" background="light-1">
        <Attraction size="xlarge" />
      </Box>
      <Box pad="xlarge" background="light-2">
        <TreeOption size="xlarge" />
      </Box>
      <Box pad="xlarge" background="light-3">
        <Car size="xlarge" />
      </Box>
    </Carousel>
  </Box>
  // </Grommet>
);

Simple.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Media/Carousel/Simple',
};
