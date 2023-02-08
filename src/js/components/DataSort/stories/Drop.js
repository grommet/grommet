import React from 'react';

import { Data, DataTable, Grid, Toolbar } from 'grommet';

import { DataSort } from '../DataSort';
import { columns, DATA } from '../../DataTable/stories/data';

export const Drop = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Grid pad="large" columns={['large']} justifyContent="center">
    <Data data={DATA} updateOn="change">
      <Toolbar>
        <DataSort drop />
      </Toolbar>
      <DataTable columns={columns} />
    </Data>
  </Grid>
  // </Grommet>
);

Drop.args = {
  full: true,
};

export default {
  title: 'Data/DataSort/Drop',
};
