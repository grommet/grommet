import React from 'react';

import { Box, Button, Heading, Text, Tip } from 'grommet';
import { Trash } from 'grommet-icons';

const TipContent = ({ message }) => (
  <Box direction="row" align="center">
    <svg viewBox="0 0 22 22" version="1.1" width="22px" height="22px">
      <polygon
        fill="grey"
        points="6 2 18 12 6 22"
        transform="matrix(-1 0 0 1 30 0)"
      />
    </svg>
    <Box background="grey" direction="row" pad="small" round="xsmall">
      <Text>{message}</Text>
    </Box>
  </Box>
);

export const Caret = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box align="center" justify="center" background="dark-1" fill gap="large">
    <Heading textAlign="center" level="1" size="xsmall">
      Tooltip is styled with a Caret
    </Heading>
    <Box>
      <Box fill direction="row" justify="between">
        <Tip
          dropProps={{ align: { left: 'right' } }}
          content={<TipContent message="Designed with an SVG of Caret" />}
          plain
        >
          <Button icon={<Trash />} plain={false} />
        </Tip>
      </Box>
    </Box>
  </Box>
  // </Grommet>
);

Caret.args = {
  full: true,
};

Caret.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Controls/Tip/Caret',
};
