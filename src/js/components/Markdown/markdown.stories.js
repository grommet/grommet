import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import { Box, Markdown } from 'mnet-ui-base';

const CONTENT = `
  # Out of Breath

  You know, sometimes in life it seems like there's no way out. Like
  a sheep trapped in a maze designed by wolves. See all the
  options [here](https://github.com/probablyup/markdown-to-jsx/)

  [reference](#)

\`\`\`
import { MnetUIBase } from 'mnet-ui-base';
\`\`\`

  > i carry your heart with me

  ![alt text](//v2.grommet.io/assets/IMG_4245.jpg "Markdown Image")

  Markdown | Less | Pretty
  --- | --- | ---
  *Still* | \`renders\` | **nicely**
  1 | 2 | 3
`;

const SimpleMarkdown = () => (
  <>
    <Box align="center" pad="large">
      <Markdown>{CONTENT}</Markdown>
    </Box>
  </>
);

const StyledPre = styled.pre`
  background-color: #7d4cdb;
`;

const ComponentOverrideMarkdown = () => (
  <>
    <Box align="center" pad="large">
      <Markdown components={{ pre: StyledPre }}>{CONTENT}</Markdown>
    </Box>
  </>
);

storiesOf('Markdown', module)
  .add('Simple', () => <SimpleMarkdown />)
  .add('Component Override Markdown', () => <ComponentOverrideMarkdown />);
