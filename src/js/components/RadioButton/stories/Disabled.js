import React from 'react';

import { Box, Grommet, RadioButton } from 'grommet';

export const Disabled = () => (
  <Grommet
    theme={{ global: { input: { disabled: { cursor: 'not-allowed' } } } }}
  >
    <Box align="center" pad="large" gap="large">
      <RadioButton
        label="option 1"
        name="name"
        value="option 1"
        checked
        disabled
      />
    </Box>
  </Grommet>
);

export default {
  title: 'Input/RadioButton/Disabled',
};
