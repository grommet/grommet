import React from 'react';

import { grommet, Box, Button, Grommet, Tip } from 'grommet';

export const Simple = () => {
  return (
    <Grommet full theme={grommet}>
      <Box align="center" justify="center" fill>
        <Tip content="action info">
          <Button label="action" />
        </Tip>
      </Box>
    </Grommet>
  );
};

Simple.story = {
  parameters: {
    chromatic: { disable: true },
  },
};
