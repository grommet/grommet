import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Markdown } from 'grommet';
import { grommet } from 'grommet/themes';

const CONTENT = `
  # Out of Breath

  You know, sometimes in life it seems like there's no way out. Like
  a sheep trapped in a maze designed by wolves.

  [reference](#)
`;

const SimpleMarkdown = () => (
  <Grommet theme={grommet}>
    <Markdown>{CONTENT}</Markdown>
  </Grommet>
);

storiesOf('Markdown', module)
  .add('Simple Markdown', () => <SimpleMarkdown />);
