import React from 'react';

import { Box, RadioButton } from 'grommet';

export const Disabled = () => (
  <Box align="center" pad="large" gap="large">
    <RadioButton
      label="option 1"
      name="name"
      value="option 1"
      checked
      disabled
    />
  </Box>
);

export default {
  title: 'Input/RadioButton/Disabled',
};
