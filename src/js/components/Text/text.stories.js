import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import Text from '../Text/Text';
import Grommet from '../Grommet/Grommet';

class SimpleText extends Component {
  render() {
    return (
      <Grommet>
        <Text>Some text</Text>
      </Grommet>
    );
  }
}

storiesOf('Text', module)
  .add('Simple Text', () => <SimpleText />);
