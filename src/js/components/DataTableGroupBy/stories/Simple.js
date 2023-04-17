import React from 'react';

import { Box, Data, DataTable, Notification, Toolbar } from 'grommet';

import { DataTableGroupBy } from '../DataTableGroupBy';
import { columns, DATA } from '../../DataTable/stories/data';

// simplify option label for name property
const options = columns
  .filter(({ property }) => ['location', 'percent'].includes(property))
  .map(({ header, property }) => ({ property, label: header }));

export const Simple = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box align="center" justify="start" pad="large" gap="medium">
    <Notification
      status="info"
      message="Data is in 'beta'. The API surface is subject to change."
    />
    <Data data={DATA}>
      <Toolbar>
        <DataTableGroupBy options={options} />
      </Toolbar>
      <DataTable />
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
