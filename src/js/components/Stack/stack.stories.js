import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, Stack } from '../';
import { grommet } from '../../themes';

class SimpleStack extends Component {
  render() {
    return (
      <Grommet>
        <Stack anchor='center'>
          <Box pad='large' background='neutral-1' />
          <Box pad='small' background='accent-1' />
        </Stack>
      </Grommet>
    );
  }
}

class FillStack extends Component {
  render() {
    return (
      <Grommet theme={grommet} full={true}>
        <Stack fill={true}>
          <Box background='brand' fill={true}>
            Test
          </Box>
        </Stack>
      </Grommet>
    );
  }
}

storiesOf('Stack', module)
  .add('Simple Stack', () => <SimpleStack />)
  .add('Fill Stack', () => <FillStack />);
