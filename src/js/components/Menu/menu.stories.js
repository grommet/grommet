import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import Menu from '../Menu/Menu';
import Grommet from '../Grommet/Grommet';
import Box from '../Box/Box';

class SimpleMenu extends Component {
  render() {
    return (
      <Grommet>
        <Box direction='row' gap='large'>
          <Menu label='Actions' items={[{ label: 'Launch' }, { label: 'Abort' }]} />
        </Box>
      </Grommet>
    );
  }
}

storiesOf('Menu', module)
  .add('Simple Menu', () => <SimpleMenu />);
