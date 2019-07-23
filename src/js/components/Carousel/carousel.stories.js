import React from 'react';
import { storiesOf } from '@storybook/react';
import { Attraction, Car, TreeOption } from 'grommet-icons';

import { Grommet, Box, Carousel } from 'grommet';

const SimpleCarousel = ({ initialChild }) => (
  <Grommet>
    <Box align="center" pad="large">
      <Carousel initialChild={initialChild}>
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

storiesOf('Carousel', module).add('Simple Carousel', () => <SimpleCarousel />);
storiesOf('Carousel', module).add('Carousel With `initialChild`', () => (
  <SimpleCarousel initialChild={1} />
));
