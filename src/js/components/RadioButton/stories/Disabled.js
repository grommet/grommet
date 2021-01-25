import React from 'react';

import { Grommet, Box, RadioButton } from 'grommet';
import { grommet } from 'grommet/themes';

export const Disabled = () => (
  <Grommet theme={grommet}>
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
