import React from 'react';

import { Search } from 'grommet-icons';
import { Box, TextInput } from 'grommet';

export const Icon = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box fill align="center" justify="start" pad="large">
    <Box width="medium" gap="medium">
      <TextInput icon={<Search />} placeholder="search ..." />
      <TextInput icon={<Search />} reverse placeholder="search ..." />
    </Box>
  </Box>
  // </Grommet>
);

export default {
  title: 'Input/TextInput/Icon',
};
