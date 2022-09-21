import React from 'react';
import { Box } from 'grommet';
import { Cards } from '../Cards';

const locations = [
  'Boise',
  'Fort Collins',
  'Los Gatos',
  'Palo Alto',
  'San Francisco',
];

export const Simple = () => (
  <Box pad="large">
    <Cards a11yTitle="Locations" data={locations} />
  </Box>
);

export default {
  title: 'Visualizations/Cards/Simple',
};
