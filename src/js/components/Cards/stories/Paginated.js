import React from 'react';
import { Grid } from 'grommet';
import { Cards } from '../Cards';

const data = [];

for (let i = 0; i < 95; i += 1) {
  data.push(`item ${i + 1}`);
}

export const Paginated = () => (
  <Grid pad="large" columns={[['medium', 'large']]} justifyContent="center">
    <Cards
      data={data}
      step={9}
      show={{ page: 7 }}
      paginate
    />
  </Grid>
);

export default {
  title: 'Visualizations/Cards/Paginated',
};
