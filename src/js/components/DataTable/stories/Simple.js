import React from 'react';

import { Box, DataTable } from 'grommet';

// Source code for the data can be found here
// https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js
import { columns, DATA } from './data';

export const Simple = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={grommet}>
  <Box align="center" pad="large">
    <DataTable columns={columns} data={DATA} step={10} />
  </Box>
  // </Grommet>
);

export default {
  title: 'Visualizations/DataTable/Simple',
};
