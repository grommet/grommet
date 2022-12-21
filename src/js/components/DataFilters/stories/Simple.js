import React from 'react';

import { Box, Data } from 'grommet';

import { DataFilters } from '../DataFilters';
import { DATA } from '../../DataTable/stories/data';

export const Simple = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box fill align="center" justify="start" pad="large">
    <Data data={DATA}>
      <DataFilters />
    </Data>
  </Box>
  // </Grommet>
);

Simple.args = {
  full: true,
};

export default {
  title: 'Layout/Data/DataFilters/Simple',
};
