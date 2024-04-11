import React from 'react';
import { Box, ToggleGroup } from 'grommet';
import { List, MapLocation, Table } from 'grommet-icons';

const optionsIcons = [
  {
    icon: <List a11yTitle="List view" />,
    value: 'list',
  },
  {
    icon: <Table a11yTitle="Map view" />,
    value: 'table',
  },
  {
    icon: <MapLocation a11yTitle="Map view" />,
    value: 'map',
  },
];

export const UncontrolledIcons = () => (
  <Box pad="large">
    <ToggleGroup a11yTitle="Choose view" options={optionsIcons} />
  </Box>
);

export default {
  title: 'Controls/ToggleGroup/UncontrolledIcons',
};
