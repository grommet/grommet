import React, { useState } from 'react';

import {
  Box,
  DataFilters,
  DataFilter,
  DataSearch,
  DataSummary,
  DataTable,
  Grid,
  Toolbar,
} from 'grommet';

import { Data } from '../Data';
import { columns, DATA } from '../../DataTable/stories/data';

// simulate back end filtering
const filter = (filters) => {
  console.log('!!! filter', filters);
  return DATA.filter((datum) => {
    let matched = true;
    if (filters.propeties) {
      matched = !Object.keys(filters).some((property) => {
        const value = filters[property];
        if (Array.isArray(value)) return !value.includes(datum[property]);
        return value !== datum[property];
      });
    }
    return matched;
  });
};

export const Controlled = () => {
  const [filteredData, setFilteredData] = useState(DATA);
  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Grid flex={false} pad="large" columns={['large']} justifyContent="center">
      <Data
        data={filteredData}
        total={DATA.length}
        onSubmit={(filters) => setFilteredData(filter(filters))}
      >
        <Toolbar>
          <Box direction="row" gap="small">
            <DataSearch />
            <DataFilters drop>
              <DataFilter
                property="location"
                options={Array.from(new Set(DATA.map((d) => d.location)))
                  .filter((v) => v)
                  .sort()}
              />
            </DataFilters>
          </Box>
        </Toolbar>
        <DataSummary />
        <DataTable columns={columns} />
      </Data>
    </Grid>
    // </Grommet>
  );
};

Controlled.args = {
  full: true,
};

export default {
  title: 'Layout/Data/Controlled',
};
