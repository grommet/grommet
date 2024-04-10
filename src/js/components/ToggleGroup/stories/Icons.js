import React from 'react';
import { Box, ToggleGroup } from 'grommet';
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

export const UncontrolledIcons = () => (
  <Box pad="large">
    <ToggleGroup options={optionsIcons} />
  </Box>
);

export default {
  title: 'Controls/ToggleGroup/UncontrolledIcons',
};
