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
const options = columns.map(({ header, property }) => ({
  property,
  label: property === 'name' ? 'Name' : header,
}));

export const OrderColumns = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box align="center" justify="start" pad="large" gap="medium">
    <Data data={DATA}>
      <Toolbar>
        <DataSearch />
        <DataTableColumns drop options={options} activePanel="orderColumns" />
      </Toolbar>
      <DataSummary />
      <DataTable columns={columns} primaryKey="name" />
    </Data>
  </Box>
  // </Grommet>
);

OrderColumns.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Data/DataTableColumns/OrderColumns',
};
