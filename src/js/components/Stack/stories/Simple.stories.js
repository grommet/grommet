import React from 'react';

import { Box, Stack, Text } from 'grommet';
import { Cart } from 'grommet-icons';

export const Simple = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box align="center" pad="large">
    <Stack anchor="top-right">
      <Cart size="large" />
      <Box background="orange" pad={{ horizontal: 'xsmall' }} round>
        <Text size="small">4</Text>
      </Box>
    </Stack>
  </Box>
  // </Grommet>
);

export default {
  title: 'Layout/Stack/Simple',
};
