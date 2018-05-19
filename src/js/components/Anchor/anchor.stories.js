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

storiesOf('Anchor', module)
  .add('Simple Anchor', () => <SimpleAnchor />);
