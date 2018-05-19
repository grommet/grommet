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
          <Box pad='xlarge' align='center' background='white-2'>
            <Attraction size='xlarge' />
            <Text>Party</Text>
            <Anchor href='' label='Link' />
            <Button label='Button' onClick={() => {}} />
          </Box>
          <Box pad='xlarge' align='center' background='accent-2'>
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

storiesOf('Box', module)
  .add('Simple Box', () => <SimpleBox />);
