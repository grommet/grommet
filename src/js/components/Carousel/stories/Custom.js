import React from 'react';
import { storiesOf } from '@storybook/react';
import { Attraction, Car, TreeOption } from 'grommet-icons';

import { MnetUIBase, Box, Carousel } from 'mnet-ui-base';

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

const CustomCarousel = ({ controls, ...rest }) => (
  <MnetUIBase theme={customTheme}>
    <Box align="center" pad="large">
      <Carousel controls={controls} {...rest}>
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
  </MnetUIBase>
);

storiesOf('Carousel', module).add('Custom Controls', () => <CustomCarousel />);
