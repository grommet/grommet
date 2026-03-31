import React from 'react';
import { Grid } from 'grommet';
import { Cards } from '../Cards';

const locations = [
  'Boise',
  'Fort Collins',
  'Los Gatos',
  'Palo Alto',
  'San Francisco',
];

export const Simple = () => (
  <Grid
    pad="large"
    columns={[['medium', 'large']]}
    justifyContent="center"
    gap="large"
  >
    <Cards a11yTitle="Locations" data={locations} />
  </Grid>
);

export default {
  title: 'Visualizations/Cards/Simple',
};
