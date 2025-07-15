import React from 'react';

import { Box, DataTable } from 'grommet';

// Source code for the data can be found here
// https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js
import { groupColumns, DATA } from './data';

const expandAriaLabel = (_row, key) => `details for ${key} location`;

export const GroupedDataTable = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={grommet}>
  <Box align="center" pad="large">
    <DataTable
      columns={groupColumns}
      data={DATA}
      groupBy="location"
      expandAriaLabel={expandAriaLabel}
      sortable
    />
  </Box>
  // </Grommet>
);

GroupedDataTable.storyName = 'Grouped';

export default {
  title: 'Visualizations/DataTable/Grouped',
};
