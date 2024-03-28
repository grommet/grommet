import React, { useState } from 'react';
import { Box, ToggleButtonGroup } from 'grommet';
import { List, MapLocation, Table } from 'grommet-icons';

const optionsIcons = [
  {
    icon: <List />,
    value: 'list',
  },
  {
    icon: <Table />,
    value: 'Table',
  },
  {
    icon: <MapLocation />,
    value: 'map',
  },
];

export const Icons = () => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleToggleIcons = (option) => {
    setSelectedValue(option);
  };

  return (
    <Box fill align="center" alignSelf="start" pad="large">
      <ToggleButtonGroup
        options={optionsIcons}
        onChange={handleToggleIcons}
        value={selectedValue}
      />
    </Box>
  );
};

export default {
  title: 'Input/ToggleButtonGroup/Icons',
};
