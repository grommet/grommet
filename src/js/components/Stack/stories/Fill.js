import React from 'react';

import { Box, Grommet, Stack } from 'grommet';

export const Fill = () => (
  <Grommet full>
    <Stack fill>
      <Box background="brand" fill>
        Test
      </Box>
    </Stack>
  </Grommet>
);

export default {
  title: 'Layout/Stack/Fill',
};
