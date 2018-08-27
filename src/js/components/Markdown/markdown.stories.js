import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Markdown } from '../';
import { grommet } from '../../themes';

const CONTENT = `
  # Out of Breath

  You know, sometimes in life it seems like there's no way out. Like
  a sheep trapped in a maze designed by wolves.

  [reference](#)
`;

class SimpleMarkdown extends Component {
  render() {
    return (
      <Grommet theme={grommet}>
        <Markdown>{CONTENT}</Markdown>
      </Grommet>
    );
  }
}

storiesOf('Markdown', module)
  .add('Simple Markdown', () => <SimpleMarkdown />);
