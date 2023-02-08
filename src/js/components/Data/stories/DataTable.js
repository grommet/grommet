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
  Notification,
  Toolbar,
} from 'grommet';

import { Data } from '../Data';
import { columns, DATA } from '../../DataTable/stories/data';

export const Table = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Grid
    height={{ min: 'medium', height: '100%' }}
    pad="large"
    columns={[['small', 'large']]}
    justifyContent="center"
    alignContent="start"
    gap="large"
  >
    <Notification
      status="info"
      message="Data is in 'beta'. The API surface is subject to change."
    />
    <Data data={DATA}>
      <Toolbar>
        <DataSearch />
        <DataFilters drop>
          <DataFilter property="location" />
          <DataSort />
        </DataFilters>
      </Toolbar>
      <DataSummary />
      <Box flex overflow="auto">
        <DataTable columns={columns} />
      </Box>
    </Data>
  </Grid>
  // </Grommet>
);

Table.storyName = 'DataTable';

Table.args = {
  full: true,
};

export default {
  title: 'Data/Data/DataTable',
};
