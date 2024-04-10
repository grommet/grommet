import React from 'react';
import { Box, ToggleGroup } from 'grommet';

export const Simple = () => (
  <Box gap="large" pad="large">
    <ToggleGroup options={['Option 1', 'Option 2', 'Option 3']} />
  </Box>
);

export default {
  title: 'Controls/ToggleGroup/Simple',
};
