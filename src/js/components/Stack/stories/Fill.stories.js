import React from 'react';

import { Box, Stack } from 'grommet';

export const Fill = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Stack fill>
    <Box background="brand" fill>
      Test
    </Box>
  </Stack>
  // </Grommet>
);

Fill.args = {
  full: true,
};

export default {
  title: 'Layout/Stack/Fill',
};
