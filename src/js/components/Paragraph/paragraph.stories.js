import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import Paragraph from '../Paragraph/Paragraph';
import Grommet from '../Grommet/Grommet';

class SimpleParagraph extends Component {
  render() {
    return (
      <Grommet>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
          in reprehenderit in voluptate velit esse cillum dolore eu
          fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </Paragraph>
      </Grommet>
    );
  }
}

storiesOf('Paragraph', module)
  .add('Simple Paragraph', () => <SimpleParagraph />);
