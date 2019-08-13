import React from 'react';
import { storiesOf } from '@storybook/react';
import { Attraction, Car, TreeOption } from 'grommet-icons';

import { Grommet, Box, Carousel } from 'grommet';

const customTheme = {
  carousel: {
    animation: {
      duration: 400,
    },
    icons: {
      color: 'blue',
    },
    disabled: {
      icons: {
        color: 'grey',
      },
    },
  },
};

const SimpleCarousel = ({ initialChild, ...props }) => (
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

const CustomCarousel = () => (
  <Grommet theme={customTheme}>
    <Box align="center" pad="large">
        <Carousel controls='arrows'>
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

storiesOf('Carousel', module)
  .add('Simple Carousel', () => <SimpleCarousel />)
  .add('Without Controls', () => <SimpleCarousel controls={false} play={1000} />)
  .add('Custom Animation and Styles', () => <CustomCarousel />)
  .add('Initial child`', () => (
  <SimpleCarousel initialChild={1} />
));
