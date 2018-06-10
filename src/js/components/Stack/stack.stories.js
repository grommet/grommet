import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import Stack from '../Stack/Stack';
import Grommet from '../Grommet/Grommet';
import Box from '../Box/Box';

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

storiesOf('Stack', module)
  .add('Simple Stack', () => <SimpleStack />);
