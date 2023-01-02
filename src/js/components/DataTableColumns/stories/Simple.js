import React from 'react';

import { Data, DataTable, Grid, Toolbar } from 'grommet';

import { DataTableColumns } from '../DataTableColumns';
import { columns, DATA } from '../../DataTable/stories/data';

export const Simple = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Grid pad="large" columns={['large']} justifyContent="center">
    <Data data={DATA} updateOn="change">
      <Toolbar>
        <DataTableColumns
          drop
          options={columns.map(({ header, property }) => ({
            property,
            label: header,
          }))}
        />
      </Toolbar>
      <DataTable columns={columns} />
    </Data>
  </Grid>
  // </Grommet>
);

Simple.args = {
  full: true,
};

export default {
  title: 'Layout/Data/DataTableColumns/Simple',
};
