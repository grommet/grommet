import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Attraction, Car, TreeOption } from 'grommet-icons';

import Box from '../Box/Box';
import Text from '../Text/Text';
import Anchor from '../Anchor/Anchor';
import Button from '../Button/Button';
import Grommet from '../Grommet/Grommet';

class SimpleBox extends Component {
  render() {
    return (
      <Grommet>
        <Box
          direction='row-responsive'
          justify='center'
          align='center'
          pad='xlarge'
          background='dark-2'
        >
          <Box
            pad='xlarge'
            align='center'
            background={{ color: 'white-2', opacity: 'strong' }}
          >
            <Attraction size='xlarge' />
            <Text>Party</Text>
            <Anchor href='' label='Link' />
            <Button label='Button' onClick={() => {}} />
          </Box>
          <Box
            pad='xlarge'
            align='center'
            background={{ color: 'accent-2', opacity: 'weak' }}
          >
            <TreeOption size='xlarge' />
            <Text>Nature</Text>
            <Anchor href='' label='Link' />
            <Button label='Button' onClick={() => {}} />
          </Box>
          <Box pad='xlarge' align='center' background='dark-3'>
            <Car size='xlarge' color='light-2' />
            <Text>Travel</Text>
            <Anchor href='' label='Link' />
            <Button label='Button' onClick={() => {}} />
          </Box>
        </Box>
      </Grommet>
    );
  }
}

const customColorBox = {
  global: {
    colors: {
      'brand-gradient': 'linear-gradient(102.77deg, #865ED6 -9.18%, #18BAB9 209.09%)',
    },
  },
};

class CustomColorBox extends Component {
  render() {
    return (
      <Grommet theme={customColorBox}>
        <Box
          justify='center'
          align='center'
          pad='xlarge'
          background={{ color: 'brand-gradient', dark: true }}
          round='large'
        >
          <Text>I have a linear gradient background</Text>
        </Box>
      </Grommet>
    );
  }
}

storiesOf('Box', module)
  .add('Simple Box', () => <SimpleBox />)
  .add('Custom color', () => <CustomColorBox />);
