import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import Heading from '../Heading/Heading';
import Grommet from '../Grommet/Grommet';

class SimpleHeading extends Component {
  render() {
    return (
      <Grommet>
        <Heading>Brief Heading</Heading>
      </Grommet>
    );
  }
}

storiesOf('Heading', module)
  .add('Simple Heading', () => <SimpleHeading />);
