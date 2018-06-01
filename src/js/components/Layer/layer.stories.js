import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import Layer from '../Layer/Layer';
import Button from '../Button/Button';
import Grommet from '../Grommet/Grommet';

class CenterLayer extends Component {
  state = {}

  onOpen = () => this.setState({ open: true })

  onClose = () => this.setState({ open: undefined })

  render() {
    const { open } = this.state;
    return (
      <Grommet>
        <Button label='Open' onClick={this.onOpen} primary={true} />
        {open ? (
          <Layer
            position='center'
            modal={true}
            onClickOutside={this.onClose}
            onEsc={this.onClose}
          >
            <Button label='Close' onClick={this.onClose} />
          </Layer>
        ) : null}
      </Grommet>
    );
  }
}

storiesOf('Layer', module)
  .add('Center Layer', () => <CenterLayer />);
