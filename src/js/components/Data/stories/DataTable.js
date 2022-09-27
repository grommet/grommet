import React from 'react';

import {
  Box,
  DataFilters,
  DataFilter,
  DataSearch,
  DataSort,
  DataSummary,
  DataTable,
  Grid,
  Toolbar,
} from 'grommet';

import { Data } from '../Data';
import { columns, DATA } from '../../DataTable/stories/data';

export const Table = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Grid flex={false} pad="large" columns={['large']} justifyContent="center">
    <Data data={DATA}>
      <Toolbar>
        <Box direction="row" gap="small">
          <DataSearch />
          <DataFilters drop>
            <DataFilter property="location" />
            <DataSort />
          </DataFilters>
        </Box>
      </Toolbar>
      <DataSummary />
      <DataTable columns={columns} />
    </Data>
  </Grid>
  // </Grommet>
);

Table.storyName = 'DataTable';

Table.args = {
  full: true,
};

export default {
  title: 'Layout/Data/DataTable',
};
