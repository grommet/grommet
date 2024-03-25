import React, { useState } from 'react';
import { Box, Heading, ToggleButtonGroup } from 'grommet';
import { List, MapLocation, Table } from 'grommet-icons';

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

export const Simple = () => {
  const [selectedIcon, setSelectedIcon] = useState('');

  console.log(selectedIcon);

  const handleToggleIcons = (option) => {
    setSelectedIcon(option.value);
  };

  return (
    <Box gap="large" pad="large">
      <Box>
        <Heading>Selected icon: {selectedIcon}</Heading>
      </Box>
      <ToggleButtonGroup
        onChange={handleToggleIcons}
        options={optionsIcons}
        value={selectedIcon}
      />
    </Box>
  );
};

export default {
  title: 'Input/ToggleButtonGroup/Simple',
};
