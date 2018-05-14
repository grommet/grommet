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
          <Menu label='Actions' items={[{ label: 'Launch' }, { label: 'Abort' }]} />
        </Box>
      </Grommet>
    );
  }
}

class FocusedMenu extends Component {
  ref = React.createRef()

  componentDidMount() {
    setTimeout(() => { this.ref.current.focus(); }, 0);
  }

  render() {
    return (
      <Grommet>
        <Menu
          ref={this.ref}
          label='Actions'
          items={[{ label: 'Launch' }, { label: 'Abort' }]}
        />
      </Grommet>
    );
  }
}

storiesOf('Menu', module)
  .add('Simple Menu', () => <SimpleMenu />)
  .add('Focused Menu', () => <FocusedMenu />);
