import React from 'react';

import { Box, Grommet, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';

export const Uncontrolled = () => {
  return (
    <Grommet full theme={grommet}>
      <Box fill align="center" justify="start" pad="large">
        <Box width="medium">
          <TextInput
            onChange={event => console.log('Change', event.target.value)}
          />
        </Box>
      </Box>
    </Grommet>
  );
};

Uncontrolled.parameters = {
  chromatic: { disable: true },
};
