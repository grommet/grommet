import React from 'react';
import { Box, ToggleGroup } from 'grommet';
import { List, Table, MapLocation } from 'grommet-icons';

const options = [
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

export const Simple = () => (
  <Box gap="large" pad="large">
    <ToggleGroup
      a11yTitle="Choose view"
      options={options}
      defaultValue="list"
    />
  </Box>
);

export default {
  title: 'Controls/ToggleGroup/Simple',
};
