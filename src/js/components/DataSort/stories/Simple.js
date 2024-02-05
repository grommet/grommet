import React from 'react';

import { Box, Data, DataTable } from 'grommet';

import { DataSort } from '../DataSort';
import { columns, DATA } from '../../DataTable/stories/data';

export const Simple = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box align="center" justify="start" pad="large" gap="medium">
    <Data data={DATA}>
      <DataSort />
      <DataTable columns={columns} />
    </Data>
  </Box>
  // </Grommet>
);

Simple.args = {
  full: true,
};

export default {
  title: 'Data/DataSort/Simple',
};
