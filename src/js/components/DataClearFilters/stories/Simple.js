import React, { useContext } from 'react';

import {
  Box,
  Data,
  DataClearFilters,
  DataContext,
  DataFilter,
  DataFilters,
  DataSearch,
  DataSummary,
  DataTable,
  SelectMultiple,
  Toolbar,
} from 'grommet';
import { columns, DATA } from '../../DataTable/stories/data';

export const Simple = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box pad="medium">
    <Data
      data={DATA}
      total={DATA.length}
      properties={{
        location: { label: 'Location' },
      }}
    >
      <DataToolbar />
      <DataSummary />
      <DataTable columns={columns} />
    </Data>
  </Box>
  // </Grommet>
);

const DataToolbar = () => {
  const { filteredTotal, total } = useContext(DataContext);

  return (
    <Toolbar align="end">
      <DataSearch placeholder="Search" />
      <DataFilters updateOn="change">
        <DataFilter
          property="location"
          // override HPE theme margin to align with search + filter
          contentProps={{ margin: { bottom: 'none', top: 'xsmall' } }}
          // override Grommet theme margin to align with search + filter
          margin="none"
        >
          <SelectMultiple
            placeholder="Select location"
            options={['Boise', 'Fort Collins', 'Palo Alto', 'San Francisco']}
            name="location"
          />
        </DataFilter>
      </DataFilters>
      {filteredTotal !== total ? <DataClearFilters /> : null}
    </Toolbar>
  );
};

Simple.storyName = 'Simple';

export default {
  title: 'Data/DataClearFilters/Simple',
};
