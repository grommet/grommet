import React from 'react';
import {
  Box,
  Data,
  DataSearch,
  DataSummary,
  DataTable,
  DataTableColumns,
  Toolbar,
} from 'grommet';
import { columns, DATA } from '../../DataTable/stories/data';

// simplify option label for name property
const options = columns.map(({ header, property }, i) => ({
  property,
  label: property === 'name' ? 'Name' : header,
  pinned: i === 0 || i === 1,
}));

export const Pinned = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box align="center" justify="start" pad="large" gap="medium">
    <Data data={DATA}>
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

Pinned.args = {
  full: true,
};

export default {
  title: 'Data/DataTableColumns/Pinned',
};
