import React from 'react';

import {
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
  <Grid
    flex={false}
    pad="large"
    columns={[['small', 'medium']]}
    justifyContent="center"
  >
    <Data data={DATA}>
      <Toolbar>
        <DataSearch />
        <DataFilters drop>
          <DataFilter property="location" />
        </DataFilters>
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
