import React from 'react';

import { Anchor, Box, Grommet } from 'grommet';

export const Disabled = () => (
  <Grommet
    theme={{ global: { control: { disabled: { cursor: 'not-allowed' } } } }}
  >
    <Box gap="medium" align="center" pad="large">
      <Anchor disabled label="Disabled Anchor" />
    </Box>
  </Grommet>
);

Disabled.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Controls/Anchor/Disabled',
};
