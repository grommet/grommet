import React from 'react';

import { Box, Stack } from 'grommet';

export const Simple = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Stack anchor="center">
    <Box pad="large" background="neutral-1" />
    <Box pad="small" background="accent-1" />
  </Stack>
  // </Grommet>
);

export default {
  title: 'Layout/Stack/Simple',
};
