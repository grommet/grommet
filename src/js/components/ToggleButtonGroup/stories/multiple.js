import React, { useState } from 'react';
import { Box, ToggleButtonGroup } from 'grommet';

export const Multiple = () => {
  const [multipleSelectedColors, setMultipleSelectedColors] = useState(['Red']);

  const handleColorsToggle = (colors) => {
    setMultipleSelectedColors(colors);
  };

  return (
    <Box pad="large">
      <ToggleButtonGroup
        options={['Red', 'Green', 'Blue']}
        onChange={handleColorsToggle}
        multiple
        value={multipleSelectedColors}
      />
    </Box>
  );
};

export default {
  title: 'Input/ToggleButtonGroup/Multiple',
};
