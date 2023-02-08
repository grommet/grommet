import React from 'react';

import { Data, DataTable, Grid } from 'grommet';

import { DataSort } from '../DataSort';
import { columns, DATA } from '../../DataTable/stories/data';

export const Simple = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Grid pad="large" columns={['large']} justifyContent="center">
    <Data data={DATA} updateOn="change">
      <DataSort />
      <DataTable columns={columns} />
    </Data>
  </Grid>
  // </Grommet>
);

Simple.args = {
  full: true,
};

export default {
  title: 'Data/DataSort/Simple',
};
