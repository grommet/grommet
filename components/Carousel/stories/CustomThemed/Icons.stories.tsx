import React from 'react';
import {
  Attraction,
  Car,
  RadialSelected,
  Rewind,
  FastForward,
  TreeOption,
} from 'grommet-icons';
import { ThemeType } from 'grommet/themes';
import { Box, Grommet } from 'grommet';
import { Carousel } from '../../Carousel';

// Type annotations can only be used in TypeScript files.
// Remove ': ThemeType' if you are not using Typescript.
const customTheme: ThemeType = {
  carousel: {
    animation: {
      duration: 500,
    },
    icons: {
      color: 'orange',
      current: RadialSelected,
      next: FastForward,
      previous: Rewind,
    },
  },
};

export const Icons = () => (
  <Grommet theme={customTheme}>
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
