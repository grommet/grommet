import React from 'react';

import { Box, DataTable } from 'grommet';
// Source code for the data can be found here
// https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js
import { columns, DATA } from './data';

export const TunableDataTable = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={grommet}>
  <Box align="center" pad="large">
    <DataTable
      columns={columns.map((c) => ({
        ...c,
        search: c.property === 'name' || c.property === 'location',
      }))}
      data={DATA}
      sortable
      resizeable
    />
  </Box>
  // </Grommet>
);

TunableDataTable.storyName = 'Tunable';

export default {
  title: 'Visualizations/DataTable/Tunable',
};
