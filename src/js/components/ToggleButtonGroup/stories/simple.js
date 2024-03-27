import React, { useState } from 'react';
import { Box, ToggleButtonGroup } from 'grommet';

export const Simple = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedChoice, setSelectedChoice] = useState('');

  const handleToggleOption = (option) => {
    setSelectedOption(option);
  };

  return (
    <Box gap="large" pad="large">
      <ToggleButtonGroup
        options={[
          { label: 'Choice 1', value: 'c1' },
          { label: 'Choice 2', value: 'c2' },
          { label: 'Choice 3', value: 'c3' },
        ]}
        value={selectedChoice}
        onChange={(value) => setSelectedChoice(value)}
      />
      <ToggleButtonGroup
        onChange={handleToggleOption}
        options={['Option 1', 'Option 2', 'Option 3']}
        value={selectedOption}
      />
    </Box>
  );
};

export default {
  title: 'Input/ToggleButtonGroup/Simple',
};
