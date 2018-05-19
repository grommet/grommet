import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Attraction, Car, TreeOption } from 'grommet-icons';

import Carousel from '../Carousel/Carousel';
import Box from '../Box/Box';
import Grommet from '../Grommet/Grommet';

class SimpleCarousel extends Component {
  render() {
    return (
      <Grommet>
        <Box justify='center' align='center'>
          <Carousel>
            <Box pad='xlarge' background='accent-1'>
              <Attraction size='xlarge' />
            </Box>
            <Box pad='xlarge' background='accent-2'>
              <TreeOption size='xlarge' />
            </Box>
            <Box pad='xlarge' background='accent-3'>
              <Car size='xlarge' />
            </Box>
          </Carousel>
        </Box>
      </Grommet>
    );
  }
}

storiesOf('Carousel', module)
  .add('Simple Carousel', () => <SimpleCarousel />);
