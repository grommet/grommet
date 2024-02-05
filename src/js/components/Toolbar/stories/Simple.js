import React from 'react';

import { Box, Button, Data, DataFilters, DataSearch } from 'grommet';

import { Toolbar } from '../Toolbar';
import { DATA } from '../../DataTable/stories/data';

export const Simple = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box fill align="center" justify="start" pad="large" gap="large">
    <Box width="large">
      <Data data={DATA}>
        <Toolbar>
          <DataSearch />
          <DataFilters layer />
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
