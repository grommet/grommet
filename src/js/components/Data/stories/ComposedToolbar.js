import React from 'react';

import {
  Box,
  DataFilters,
  DataFilter,
  DataSearch,
  DataSort,
  DataSummary,
  DataTable,
  DataTableColumns,
  DataView,
  Toolbar,
} from 'grommet';

import { Data } from '../Data';
import { columns, DATA } from '../../DataTable/stories/data';

export const ComposedToolbar = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box pad="large">
    <Data
      data={DATA}
      properties={{
        date: { filter: false },
        location: { label: 'Location' },
        name: { filter: false },
        percent: { filter: false },
        paid: { filter: false },
      }}
      views={[
        {
          name: 'My location',
          properties: {
            location: ['San Francisco'],
          },
        },
      ]}
    >
      <Toolbar gap="medium">
        <Toolbar>
          <DataSearch />
          <DataSort drop />
          <DataFilters drop>
            <DataFilter property="location" />
          </DataFilters>
        </Toolbar>
        <DataView />
        <DataTableColumns
          options={columns.map((column) => ({
            property: column.property,
            label: column.header,
          }))}
          drop
        />
      </Toolbar>
      <DataSummary />
      <Box overflow="auto">
        <DataTable alignSelf="start" columns={columns} sortable />
      </Box>
    </Data>
  </Box>
  // </Grommet>
);

ComposedToolbar.storyName = 'Composed Toolbar';

ComposedToolbar.args = {
  full: true,
};

export default {
  title: 'Data/Data/Composed Toolbar',
};
