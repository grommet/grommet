import React, { useState, useEffect } from 'react';
import { Box, Heading, ToggleButtonGroup } from 'grommet';
import {
  List,
  MapLocation,
  Table,
  Bold,
  Italic,
  Underline,
} from 'grommet-icons';


const optionsIcons = [
  {
    label: <List />,
    value: 'list',
  },
  {
    label: <Table />,
    value: 'table',
  },
  {
    label: <MapLocation />,
    value: 'map',
  },
];


export const newStory = () => {
  const [multipleSelectedColors, setMultipleSelectedColors] = useState(['Red']);
  const [selectedOption, setSelectedOption] = useState('');

  console.log(selectedOption);

  const handleToggle = (option) => {
    setSelectedOption(option);
  };

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
        />
      </Box>
      <Box>
        <Heading>Selected color: {selectedOption}</Heading>
        <ToggleButtonGroup
          options={['Option 1', 'Option 2', 'Option 3']}
          onChange={handleToggle}
          defaultValue="Option 3"
        />
      </Box>
      <ToggleButtonGroup
          options={optionsIcons}
        />
    </Box>
  );
};

export default {
  title: 'Input/ToggleButtonGroup/newStory',
};
