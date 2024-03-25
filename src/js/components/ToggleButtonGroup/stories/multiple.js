import React, { useState } from 'react';
import { Box, Heading, ToggleButtonGroup } from 'grommet';

export const Multiple = () => {
  const [multipleSelectedColors, setMultipleSelectedColors] = useState(['Red']);

  const handleColorsToggle = (colors) => {
    setMultipleSelectedColors(colors);
  };

  return (
    <Box gap="large" pad="large">
      <Box>
        <Heading>Selected colors: {multipleSelectedColors}</Heading>
        <ToggleButtonGroup
          options={['Red', 'Green', 'Blue']}
          onChange={handleColorsToggle}
          multiple
          value={multipleSelectedColors}
        />
      </Box>
    </Box>
  );
};

export default {
  title: 'Input/ToggleButtonGroup/Multiple',
};
