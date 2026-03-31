import React from 'react';

import { Box, Markdown } from 'grommet';

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
  Content *still* | \`renders\` | **nicely** in a table
  1 | 2 | 3
`;

export const Simple = () => {
  const ref = React.useRef();
  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box align="center" pad="large">
      <Markdown ref={ref}>{CONTENT}</Markdown>
    </Box>
    // </Grommet>
  );
};

export default {
  title: 'Type/Markdown/Simple',
};
