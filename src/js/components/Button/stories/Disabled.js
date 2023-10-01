import React from 'react';

import { Box, Button, Grommet } from 'grommet';

export const Disabled = () => (
  <Grommet
    theme={{ global: { control: { disabled: { cursor: 'not-allowed' } } } }}
  >
    <Box align="center" pad="medium">
      <Button label="Disabled" disabled />
    </Box>
  </Grommet>
);

export default {
  title: 'Controls/Button/Disabled',
};
