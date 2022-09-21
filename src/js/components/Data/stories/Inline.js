import React from 'react';

import {
  Box,
  DataFilters,
  DataFilter,
  DataSearch,
  DataSummary,
  DataTable,
  Grid,
  Heading,
} from 'grommet';

import { Data } from '../Data';
import { columns, DATA } from '../../DataTable/stories/data';

export const Inline = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box flex={false} fill="horizontal" justify="start" pad="large">
    <Data data={DATA} onChange>
      <Grid columns={['auto', 'flex']} gap="medium">
        <DataFilters>
          <DataSearch />
          <DataFilter property="location" />
        </DataFilters>
        <Box flex={false}>
          <Heading size="small" margin="none">
            People
          </Heading>
          <DataSummary />
          <Box flex={false}>
            <DataTable columns={columns} />
          </Box>
        </Box>
      </Grid>
    </Data>
  </Box>
  // </Grommet>
);

Inline.args = {
  full: true,
};

export default {
  title: 'Layout/Data/Inline',
};
