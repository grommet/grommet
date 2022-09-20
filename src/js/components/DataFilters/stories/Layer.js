import React from 'react';

import { Box, Data, DataFilter } from 'grommet';

import { DataFilters } from '../DataFilters';
import { DATA } from '../../DataTable/stories/data';

export const Layer = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box fill align="center" justify="start" pad="large">
    <Data data={DATA}>
      <DataFilters layer>
        <DataFilter property="location" />
      </DataFilters>
    </Data>
  </Box>
  // </Grommet>
);

Layer.args = {
  full: true,
};

export default {
  title: 'Input/DataFilters/Layer',
};
