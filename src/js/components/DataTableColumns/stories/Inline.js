import React from 'react';

import { Data, DataFilters, DataTable, Grid } from 'grommet';

import { DataTableColumns } from '../DataTableColumns';
import { columns, DATA } from '../../DataTable/stories/data';

const simplerColumns = columns.map(({ header, property }) => ({
  property,
  label: header,
}));
simplerColumns.name = 'Name';

export const Inline = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Grid pad="large" columns={['large']} justifyContent="center">
    <Data data={DATA} updateOn="change">
      <DataFilters>
        <DataTableColumns options={simplerColumns} />
      </DataFilters>
      <DataTable columns={columns} />
    </Data>
  </Grid>
  // </Grommet>
);

Inline.args = {
  full: true,
};

export default {
  title: 'Layout/Data/DataTableColumns/Inline',
};
