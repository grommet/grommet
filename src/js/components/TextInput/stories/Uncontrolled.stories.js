import React from 'react';

import { Box, TextInput } from 'grommet';

export const Uncontrolled = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box fill align="center" justify="start" pad="large">
    <Box width="medium">
      <TextInput
        onChange={(event) => console.log('Change', event.target.value)}
        aria-label="Input Text"
      />
    </Box>
  </Box>
  // </Grommet>
);

Uncontrolled.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Input/TextInput/Uncontrolled',
};
