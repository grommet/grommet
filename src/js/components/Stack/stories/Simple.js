import React from 'react';

import { Grommet, Box, Stack } from 'grommet';

export const Simple = () => (
  <Grommet>
    <Stack anchor="center">
      <Box pad="large" background="neutral-1" />
      <Box pad="small" background="accent-1" />
    </Stack>
  </Grommet>
);

export default {
  title: 'Layout/Stack/Simple',
};
