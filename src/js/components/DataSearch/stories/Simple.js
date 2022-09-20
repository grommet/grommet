import React from 'react';

import { Box, Data } from 'grommet';

import { DataSearch } from '../DataSearch';
import { DATA } from '../../DataTable/stories/data';

export const Simple = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box fill align="center" justify="start" pad="large">
    <Data data={DATA}>
      <DataSearch />
    </Data>
  </Box>
  // </Grommet>
);

Simple.args = {
  full: true,
};

export default {
  title: 'Input/DataSearch/Simple',
};
