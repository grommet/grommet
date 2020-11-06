import React from 'react';

import { Grommet, Box, RadioButton } from 'grommet';
import { grommet } from 'grommet/themes';

export const Disabled = () => {
  return (
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
};
