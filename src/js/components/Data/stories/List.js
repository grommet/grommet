import React from 'react';

import {
  Box,
  DataFilters,
  DataFilter,
  DataSummary,
  List,
  Toolbar,
} from 'grommet';

import { Data } from '../Data';
import { DATA } from '../../DataTable/stories/data';

export const Example = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box flex={false} fill="horizontal" pad="large">
    <Data data={DATA}>
      <Toolbar>
        <DataFilters drop>
          <DataFilter property="location" />
        </DataFilters>
      </Toolbar>
      <DataSummary />
      <List primaryKey="name" secondaryKey="location" />
    </Data>
  </Box>
  // </Grommet>
);

Example.storyName = 'List';

Example.args = {
  full: true,
};

export default {
  title: 'Layout/Data/List',
};
