import React from 'react';

import { Grommet, Box, Stack } from 'grommet';
import { grommet } from 'grommet/themes';

export const Simple = () => (
  <Grommet>
    <Stack anchor="center">
      <Box pad="large" background="neutral-1" />
      <Box pad="small" background="accent-1" />
    </Stack>
  </Grommet>
);

export const Fill = () => (
  <Grommet theme={grommet} full>
    <Stack fill>
      <Box background="brand" fill>
        Test
      </Box>
    </Stack>
  </Grommet>
);

export default {
  title: 'Layout/Stack',
};
