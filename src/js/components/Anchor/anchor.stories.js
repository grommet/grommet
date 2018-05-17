import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import Anchor from '../Anchor/Anchor';
import Grommet from '../Grommet/Grommet';

class SimpleAnchor extends Component {
  render() {
    return (
      <Grommet>
        <Anchor>Link</Anchor>
      </Grommet>
    );
  }
}

class FocusedAnchor extends Component {
  ref = React.createRef()

  componentDidMount() {
    this.ref.current.focus();
  }

  render() {
    return (
      <Grommet>
        <Anchor ref={this.ref} href='#'>
          Link
        </Anchor>
      </Grommet>
    );
  }
}

storiesOf('Anchor', module)
  .add('Simple Anchor', () => <SimpleAnchor />)
  .add('Focused Anchor', () => <FocusedAnchor />);
