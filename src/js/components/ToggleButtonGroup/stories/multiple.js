import React, { useState } from 'react';
import { Box, Button, Heading, ToggleButtonGroup } from 'grommet';

export const Multiple = () => {
  const [multipleSelectedColors, setMultipleSelectedColors] = useState(['Red']);

  const handleColorsToggle = (colors) => {
    setMultipleSelectedColors(colors);
  };

  return (
    <Box gap="large" pad="large">
      <Heading>Selected colors: {multipleSelectedColors}</Heading>
      <Box gap="xsmall" direction="row">
        <ToggleButtonGroup
          options={['Red', 'Green', 'Blue']}
          onChange={handleColorsToggle}
          multiple
          value={multipleSelectedColors}
        />
        <Button primary label="hello" />
      </Box>
    </Box>
  );
};

export default {
  title: 'Input/ToggleButtonGroup/Multiple',
};
