import React from 'react';
import { Attraction, Car, TreeOption } from 'grommet-icons';

import { Grommet, Box, Carousel } from 'grommet';

export const SimpleCarousel = ({ initialChild, ...props }) => {
  return (
    <Grommet>
      <Box align="center" pad="large">
        <Carousel initialChild={initialChild} {...props}>
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
};

export const Simple = () => <SimpleCarousel />;
export const Initial = () => <SimpleCarousel initialChild={1} />;
export const NoControls = () => <SimpleCarousel controls={false} play={1500} />;

Simple.story = {
  parameters: {
    chromatic: { disable: true },
  },
};

Initial.story = {
  name: 'Initial child',
};

NoControls.story = {
  name: 'Without controls',
};
