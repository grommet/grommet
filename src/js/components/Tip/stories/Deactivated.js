import React from 'react';

import { Box, Button, Tip } from 'grommet';

export const Deactivated = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box align="center" justify="center" fill gap="large">
    <Tip content="Activated" deactivated={false}>
      <Button label="Activated" />
    </Tip>

    <Tip content="Activated" deactivated>
      <Button label="Deactivated" />
    </Tip>
  </Box>
  // </Grommet>
);

Deactivated.args = {
  full: true,
};

Deactivated.parameters = {
  chromatic: { disable: true },
};

Deactivated.storyName = 'Deactivated';

export default {
  title: 'Controls/Tip/Deactivated',
};
