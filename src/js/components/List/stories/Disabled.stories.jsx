import React from 'react';

import { Box, List } from 'grommet';

const locations = [
  'Boise',
  'Fort Collins',
  'Los Gatos',
  'Palo Alto',
  'San Francisco',
];

const disabledLocations = ['Fort Collins', 'Palo Alto'];

export const Disabled = () => (
  <Box align="center" pad="large">
    <List
      a11yTitle="Locations"
      data={locations}
      disabled={disabledLocations}
      onClickItem={(e) => {
        console.log(e);
      }}
    />
  </Box>
);

export default {
  title: 'Visualizations/List/Disabled',
};
