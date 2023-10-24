import React from 'react';

import { grommet, Box, Button, Grommet, Tip } from 'grommet';

export const Simple = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box align="center" justify="center" fill>
    <Tip content="action info">
      <Button label="action" />
    </Tip>
  </Box>
  //</Grommet>
);

Simple.args = {
  full: true,
};

Simple.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Controls/Tip/Simple',
};
