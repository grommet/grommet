import React from 'react';

import {
  Box,
  Data,
  DataSearch,
  DataSummary,
  DataTable,
  Notification,
  Toolbar,
} from 'grommet';

import { DataTableColumns } from '../DataTableColumns';
import { columns, DATA } from '../../DataTable/stories/data';

// simplify option label for name property
const options = columns.map(({ header, property }) => ({
  property,
  label: property === 'name' ? 'Name' : header,
}));

export const Simple = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box align="center" justify="start" pad="large" gap="medium">
    <Notification
      status="info"
      message="Data is in 'beta'. The API surface is subject to change."
    />
    <Data data={DATA} updateOn="change">
      <Toolbar>
        <DataSearch />
        <DataTableColumns drop options={options} />
      </Toolbar>
      <DataSummary />
      <DataTable columns={columns} primaryKey="name" />
    </Data>
  </Box>
  // </Grommet>
);

Simple.args = {
  full: true,
};

export default {
  title: 'Data/DataTableColumns/Simple',
};
