import React from 'react';
import { Box, ToggleButtonGroup } from 'grommet';

export const Simple = () => (
  <Box gap="large" pad="large">
    <ToggleButtonGroup options={['Option 1', 'Option 2', 'Option 3']} />
    <ToggleButtonGroup
      options={[
        { label: 'Choice 1', value: 'c1' },
        { label: 'Choice 2', value: 'c2' },
        { label: 'Choice 3', value: 'c3' },
      ]}
    />
  </Box>
);

export default {
  title: 'Controls/ToggleButtonGroup/Simple',
};
