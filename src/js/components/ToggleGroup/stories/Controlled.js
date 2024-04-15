import React, { useState } from 'react';
import { Box, ToggleGroup, Text } from 'grommet';

export const ControlledGroup = () => {
  const [multipleControlled, setMultipleControlled] = useState(['c2']);

  return (
    <Box direction="row" gap="xlarge" overflow="auto">
      <Box gap="large" pad="large">
        <Text>An option always has to be checked</Text>
        <ToggleGroup
          options={[
            { label: 'Choice 1', value: 'c1' },
            { label: 'Choice 2', value: 'c2' },
            { label: 'Choice 3', value: 'c3' },
          ]}
          value={multipleControlled}
          onToggle={(e) => {
            if (e.value.length) setMultipleControlled(e.value);
          }}
          multiple
        />
      </Box>
    </Box>
  );
};

export default {
  title: 'Controls/ToggleGroup/ControlledGroup',
};
