import React from 'react';
import { Box, Data, DataTable, DataTableGroupBy, Toolbar } from 'grommet';
import { columns, DATA } from '../../DataTable/stories/data';

// simplify option label for name property
const options = columns
  .filter(({ property }) => ['location', 'percent'].includes(property))
  .map(({ header, property }) => ({ property, label: header }));

export const Simple = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box align="center" justify="start" pad="large" gap="medium">
    <Data data={DATA}>
      <Toolbar>
        <DataTableGroupBy options={options} />
      </Toolbar>
      <DataTable columns={columns} />
    </Data>
  </Box>
  // </Grommet>
);

Simple.args = {
  full: true,
};

export default {
  title: 'Data/DataTableGroupBy/Simple',
};
