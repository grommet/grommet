import React from 'react';

import { Box, Stack } from 'grommet';

export const Simple = () => (
  <Stack anchor="center">
    <Box pad="large" background="neutral-1" />
    <Box pad="small" background="accent-1" />
  </Stack>
);

export default {
  title: 'Layout/Stack/Simple',
};
