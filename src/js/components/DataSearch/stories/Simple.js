import React from 'react';
import {
  Box,
  Data,
  DataSummary,
  DataTable,
  DataSearch,
  Paragraph,
  Toolbar,
} from 'grommet';

import { columns, DATA } from '../../DataTable/stories/data';

export const Simple = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box pad="large">
    <Paragraph color="text-weak">
      Note: Results are filtered as you type, checking all fields.
    </Paragraph>
    <Data data={DATA}>
      <Toolbar>
        <DataSearch />
      </Toolbar>
      <DataSummary />
      <DataTable alignSelf="start" columns={columns} />
    </Data>
  </Box>
  // </Grommet>
);

Simple.args = {
  full: true,
};

export default {
  title: 'Data/DataSearch/Simple',
};
