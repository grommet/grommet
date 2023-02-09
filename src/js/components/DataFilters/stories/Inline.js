import React from 'react';

import {
  Box,
  Data,
  DataFilter,
  DataSearch,
  DataSort,
  Notification,
} from 'grommet';

import { DataFilters } from '../DataFilters';
import { DATA } from '../../DataTable/stories/data';

export const Inline = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box align="center" justify="start" pad="large" gap="medium">
    <Notification
      status="info"
      message="Data is in 'beta'. The API surface is subject to change."
    />
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
