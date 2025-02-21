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
  DataView,
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
        location: { label: 'Location', badge: false },
        percent: { label: 'Percent' },
        date: { label: 'date' },
        name: { label: 'Name' },
      }}
      views={[
        { name: 'latest', sort: { property: 'date', direction: 'desc' } },
        {
          name: 'Bay Area behind',
          properties: {
            percent: { min: 0, max: 50 },
            location: ['San Francisco'],
          },
        },
      ]}
    >
      <DataToolbar />
      <DataSummary />
      <DataTable columns={columns} />
    </Data>
  </Box>
  // </Grommet>
);

const DataToolbar = () => {
  const { view } = useContext(DataContext);

  return (
    <Toolbar gap="medium" align="end">
      <Toolbar align="end">
        <DataSearch />
        <DataFilters updateOn="change" clearFilters={false}>
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
        <DataFilters layer clearFilters={false}>
          <DataFilter property="name" />
          <DataFilter property="percent" />
          <DataFilter property="paid" />
        </DataFilters>
        {view?.properties !== undefined &&
        Object.keys(view?.properties).length !== 0 ? (
          <DataClearFilters />
        ) : null}
      </Toolbar>
      <DataView />
    </Toolbar>
  );
};

Simple.storyName = 'Simple';

export default {
  title: 'Data/DataClearFilters/Simple',
};
