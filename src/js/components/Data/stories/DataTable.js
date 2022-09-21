import React from 'react';

import {
  Box,
  DataFilters,
  DataFilter,
  DataSearch,
  DataSummary,
  DataTable,
  Toolbar,
} from 'grommet';

import { Data } from '../Data';
import { columns, DATA } from '../../DataTable/stories/data';

export const Table = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box flex={false} fill="horizontal" pad="large">
    <Data data={DATA}>
      <Toolbar>
        <Box direction="row" gap="small">
          <DataSearch />
          <DataFilters drop>
            <DataFilter property="location" />
          </DataFilters>
        </Box>
      </Toolbar>
      <DataSummary />
      <DataTable columns={columns} />
    </Data>
  </Box>
  // </Grommet>
);

Table.storyName = 'DataTable';

Table.args = {
  full: true,
};

export default {
  title: 'Layout/Data/DataTable',
};
