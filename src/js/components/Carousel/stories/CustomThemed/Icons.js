import React from 'react';
import {
  Attraction,
  Car,
  RadialSelected,
  Rewind,
  FastForward,
  TreeOption,
} from 'grommet-icons';
import { Box, Grommet } from 'grommet';
import { Carousel } from '../../Carousel';

const theme = {
  carousel: {
    icons: {
      color: 'orange',
      current: RadialSelected,
      next: FastForward,
      previous: Rewind,
    },
  },
};

export const Icons = () => (
  <Grommet theme={theme}>
    <Box align="center" pad="large">
      <Carousel controls>
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

export default {
  title: 'Media/Carousel/Custom Themed/Icons',
};
