import React from 'react';

import { Box, List } from 'grommet';

const locations = [
  'Boise',
  'Fort Collins',
  'Los Gatos',
  'Palo Alto',
  'San Francisco',
];

export const Basic = () => (
  <Box align="center" pad="large">
    <List a11yTitle="Locations" data={locations} />
  </Box>
);

export default {
  title: 'Visualizations/List/Basic',
};
