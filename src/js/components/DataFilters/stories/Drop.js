import React from 'react';

import { Box, Data, DataFilter } from 'grommet';

import { DataFilters } from '../DataFilters';
import { DATA } from '../../DataTable/stories/data';

export const Drop = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box fill align="center" justify="start" pad="large">
    <Data data={DATA}>
      <DataFilters drop>
        <DataFilter property="location" />
      </DataFilters>
    </Data>
  </Box>
  // </Grommet>
);

Drop.args = {
  full: true,
};

export default {
  title: 'Input/DataFilters/Drop',
};
