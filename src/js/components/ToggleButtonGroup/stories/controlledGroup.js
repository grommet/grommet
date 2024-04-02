import React, { useState } from 'react';
import { Box, ToggleButtonGroup, Text } from 'grommet';

export const ControlledGroup = () => {
  const [singleControlled, setSingleControlled] = useState('c2');
  const [multipleControlled, setMultipleControlled] = useState();

  return (
    <Box direction="row" gap="xlarge" overflow="auto">
      <Box gap="large" pad="large">
        <Text>An option always has to be checked</Text>
        <ToggleButtonGroup
          options={[
            { label: 'Choice 1', value: 'c1' },
            { label: 'Choice 2', value: 'c2' },
            { label: 'Choice 3', value: 'c3' },
          ]}
          defaultValue="c2"
          value={singleControlled}
          onChange={(nextValue) => {
            if (nextValue) setSingleControlled(nextValue);
          }}
        />
        <ToggleButtonGroup
          options={[
            { label: 'Choice 1', value: 'c1' },
            { label: 'Choice 2', value: 'c2' },
            { label: 'Choice 3', value: 'c3' },
          ]}
          defaultValue="c2"
          value={multipleControlled}
          onChange={(nextValue) => {
            if (nextValue.length) setMultipleControlled(nextValue);
          }}
          multiple
        />
      </Box>
    </Box>
  );
};

export default {
  title: 'Input/ToggleButtonGroup/ControlledGroup',
};
