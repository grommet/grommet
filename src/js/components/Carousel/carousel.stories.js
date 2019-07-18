import React from 'react';
import { storiesOf } from '@storybook/react';
import { Attraction, Car, TreeOption } from 'grommet-icons';

import { Grommet, Box, Carousel } from 'grommet';

const SimpleCarousel = ({ initialActiveIndex }) => (
  <Grommet>
    <Box align="center" pad="large">
      <Carousel initialActiveIndex={initialActiveIndex}>
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
storiesOf('Carousel', module).add(
  'Simple Carousel With `initialActiveIndex: 1`',
  () => <SimpleCarousel initialActiveIndex={1} />,
);
