import React from 'react';
import { Box, Data, DataFilter, DataFilters } from 'grommet';
import { DATA } from '../../DataTable/stories/data';

export const Layer = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box align="center" justify="start" pad="large" gap="medium">
    <Data data={DATA}>
      <DataFilters layer>
        <DataFilter property="name" />
        <DataFilter property="location" />
        <DataFilter property="percent" />
        <DataFilter property="paid" />
      </DataFilters>
    </Data>
  </Box>
  // </Grommet>
);

Layer.args = {
  full: true,
};

export default {
  title: 'Data/DataFilters/Layer',
};
