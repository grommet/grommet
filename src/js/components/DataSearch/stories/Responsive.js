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

export const Responsive = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box pad="large">
    <Paragraph color="text-weak">
      Note: Results are filtered as you type, checking all fields. When
      responsive=true on DataSearch, the search control will collapse at small
      breakpoints. Reduce the width of your screen to see this behavior.
    </Paragraph>
    <Data data={DATA}>
      <Toolbar>
        <DataSearch responsive />
      </Toolbar>
      <DataSummary />
      <DataTable columns={columns} />
    </Data>
  </Box>
  // </Grommet>
);

Responsive.args = {
  full: true,
};

export default {
  title: 'Data/DataSearch/Responsive',
};
