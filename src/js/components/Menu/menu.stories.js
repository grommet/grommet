import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, Menu } from '../';
import { grommet } from '../../themes';

class SimpleMenu extends Component {
  render() {
    return (
      <Grommet theme={grommet}>
        <Box direction='row' gap='large'>
          <Menu
            label='Actions'
            items={[
              { label: 'Launch', onClick: () => {} },
              { label: 'Abort', onClick: () => {} },
            ]}
          />
        </Box>
      </Grommet>
    );
  }
}

storiesOf('Menu', module)
  .add('Simple Menu', () => <SimpleMenu />);
