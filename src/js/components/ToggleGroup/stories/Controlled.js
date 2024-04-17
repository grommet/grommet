import React, { useState } from 'react';
import { Box, ToggleGroup, Text } from 'grommet';

export const Controlled = () => {
  const [value, setValue] = useState(['Option 2']);

  return (
    <Box direction="row" gap="xlarge" overflow="auto">
      <Box gap="large" pad="large">
        <Text>In multiple selection mode, enforce at least one selection.</Text>
        <ToggleGroup
          options={['Option 1', 'Option 2', 'Option 3']}
          value={value}
          onToggle={(e) => {
            if (e.value.length) setValue(e.value);
          }}
          multiple
        />
      </Box>
    </Box>
  );
};

export default {
  title: 'Controls/ToggleGroup/Controlled',
};
