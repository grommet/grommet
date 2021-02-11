import React from 'react';

import { Search } from 'grommet-icons';
import { Box, Grommet, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';

export const Icon = () => (
  <Grommet full theme={grommet}>
    <Box fill align="center" justify="start" pad="large">
      <Box width="medium" gap="medium">
        <TextInput icon={<Search />} placeholder="search ..." />
        <TextInput icon={<Search />} reverse placeholder="search ..." />
      </Box>
    </Box>
  </Grommet>
);

export default {
  title: 'Input/TextInput/Icon',
};
