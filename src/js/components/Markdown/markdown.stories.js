import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import Markdown from '../Markdown/Markdown';
import Grommet from '../Grommet/Grommet';

class SimpleMarkdown extends Component {
  render() {
    return (
      <Grommet>
        <Markdown>{`
            # Out of Breath

            You know, sometimes in life it seems like there's no way out. Like
            a sheep trapped in a maze designed by wolves.

            [reference](#)
          `}
        </Markdown>
      </Grommet>
    );
  }
}

storiesOf('Markdown', module)
  .add('Simple Markdown', () => <SimpleMarkdown />);
