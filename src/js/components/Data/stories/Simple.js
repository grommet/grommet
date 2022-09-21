import React from 'react';

import { Box, DataTable } from 'grommet';

import { Data } from '../Data';
import { columns, DATA } from '../../DataTable/stories/data';

export const Simple = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box fill pad="large">
    <Data data={DATA} search filters={['location']}>
      <DataTable columns={columns} />
    </Data>
  </Box>
  // </Grommet>
);

Simple.args = {
  full: true,
};

export default {
  title: 'Layout/Data/Simple',
};
