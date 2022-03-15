import React from 'react';

import { Box, Stack } from 'grommet';

export const Simple = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Stack anchor="center">
    <Box pad="large" background="light-3" />
    <Box pad="small" background="brand" />
  </Stack>
  // </Grommet>
);

export default {
  title: 'Layout/Stack/Simple',
};
