import React from 'react';
import { Grid, Notification } from 'grommet';
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
    <Notification
      status="info"
      message="Cards is in 'beta'. The API surface is subject to change."
    />
    <Cards a11yTitle="Locations" data={locations} />
  </Grid>
);

export default {
  title: 'Visualizations/Cards/Simple',
};
