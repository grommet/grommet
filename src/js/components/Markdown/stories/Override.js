import React from 'react';
import styled from 'styled-components';

import { Box, Grommet, Markdown } from 'grommet';
import { grommet } from 'grommet/themes';

const CONTENT = `
  # Out of Breath

  You know, sometimes in life it seems like there's no way out. Like
  a sheep trapped in a maze designed by wolves. See all the
  options [here](https://github.com/probablyup/markdown-to-jsx/)

  [reference](#)

\`\`\`
import { Grommet } from 'grommet';
\`\`\`

  > i carry your heart with me

  ![alt text](//v2.grommet.io/assets/IMG_4245.jpg "Markdown Image")

  Markdown | Less | Pretty
  --- | --- | ---
  *Still* | \`renders\` | **nicely**
  1 | 2 | 3
`;

const StyledPre = styled.pre`
  background-color: #7d4cdb;
`;

export const ComponentOverrideMarkdown = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <Markdown components={{ pre: StyledPre }}>{CONTENT}</Markdown>
    </Box>
  </Grommet>
);

ComponentOverrideMarkdown.storyName = 'Component override markdown';

export default {
  title: 'Type/Markdown/Component override markdown',
};
