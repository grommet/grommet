import React from 'react';

import {
  Box,
  Button,
  Data,
  DataFilters,
  DataSearch,
  Notification,
} from 'grommet';

import { Toolbar } from '../Toolbar';
import { DATA } from '../../DataTable/stories/data';

export const Simple = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box fill align="center" justify="start" pad="large" gap="large">
    <Notification
      status="info"
      message="Toolbar is in 'beta'. The API surface is subject to change."
    />
    <Box width="large">
      <Data data={DATA}>
        <Toolbar>
          <DataSearch />
          <DataFilters />
          <Box flex />
          <Button label="Create" primary />
        </Toolbar>
      </Data>
    </Box>
  </Box>
  // </Grommet>
);

Simple.args = {
  full: true,
};

export default {
  title: 'Data/Toolbar/Simple',
};
