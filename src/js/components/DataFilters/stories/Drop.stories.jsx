import React from 'react';
import { Box, Data, DataFilter, DataFilters } from 'grommet';
import { DATA } from '../../DataTable/stories/data';

export const Drop = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box align="center" justify="start" pad="large" gap="medium">
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
  title: 'Data/DataFilters/Drop',
};
