import React from 'react';
import { storiesOf } from '@storybook/react';
import { Attraction, Car, TreeOption } from 'grommet-icons';

import { MnetUIBase, Box, Carousel } from 'mnet-ui-base';

const SimpleCarousel = ({ initialChild, ...props }) => {
  return (
    <MnetUIBase>
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
    </MnetUIBase>
  );
};

storiesOf('Carousel', module)
  .add('Simple', () => <SimpleCarousel />)
  .add('Initial Child', () => <SimpleCarousel initialChild={1} />)
  .add('Without Controls', () => (
    <SimpleCarousel controls={false} play={1500} />
  ));
