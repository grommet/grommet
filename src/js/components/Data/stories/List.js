import React from 'react';

import {
  Box,
  DataFilters,
  DataFilter,
  DataSearch,
  DataSummary,
  Grid,
  List,
  Toolbar,
} from 'grommet';

import { Data } from '../Data';
import { DATA } from '../../DataTable/stories/data';

export const Example = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Grid flex={false} pad="large" columns={['medium']} justifyContent="center">
    <Data data={DATA}>
      <Toolbar>
        <Box direction="row" gap="xsmall">
          <DataSearch />
          <DataFilters drop>
            <DataFilter property="location" />
          </DataFilters>
        </Box>
      </Toolbar>
      <DataSummary />
      <List primaryKey="name" secondaryKey="location" />
    </Data>
  </Grid>
  // </Grommet>
);

Example.storyName = 'List';

Example.args = {
  full: true,
};

export default {
  title: 'Layout/Data/List',
};
