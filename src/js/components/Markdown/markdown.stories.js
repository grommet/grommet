import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, Markdown } from 'grommet';
import { grommet } from 'grommet/themes';

const CONTENT = `
  # Out of Breath

  You know, sometimes in life it seems like there's no way out. Like
  a sheep trapped in a maze designed by wolves.

  [reference](#)
`;

const SimpleMarkdown = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <Markdown>{CONTENT}</Markdown>
    </Box>
  </Grommet>
);

storiesOf('Markdown', module).add('Simple Markdown', () => <SimpleMarkdown />);
