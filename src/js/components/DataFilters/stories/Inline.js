import React from 'react';

import { Box, Data, DataFilter, DataSearch, DataSort } from 'grommet';

import { DataFilters } from '../DataFilters';
import { DATA } from '../../DataTable/stories/data';

export const Inline = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box fill align="center" justify="start" pad="large">
    <Data data={DATA}>
      <DataFilters>
        <DataSearch />
        <DataFilter property="location" />
        <DataFilter property="percent" />
        <DataSort />
      </DataFilters>
    </Data>
  </Box>
  // </Grommet>
);

Inline.args = {
  full: true,
};

export default {
  title: 'Data/DataFilters/Inline',
};
