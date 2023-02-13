import React, { useState } from 'react';

import {
  DataFilters,
  DataFilter,
  DataSearch,
  DataSummary,
  DataTable,
  Grid,
  Notification,
  Toolbar,
} from 'grommet';

import { Data } from '../Data';
import { columns, DATA } from '../../DataTable/stories/data';

const defaultView = {
  properties: [],
  search: '',
  sort: { property: 'name', direction: 'asc' },
};

// simulate back end filtering
const filter = (view) => {
  const searchExp =
    view.search?.text || (typeof view.search === 'string' && view.search)
      ? new RegExp(view.search.text || view.search, 'i')
      : undefined;
  const searchProperty = view.search?.property;

  return DATA.filter((datum) => {
    let matched = true;
    if (searchExp) {
      matched = Object.keys(datum).some((property) => {
        if (
          !searchProperty ||
          searchProperty === property ||
          (Array.isArray(searchProperty) && searchProperty.includes(property))
        )
          return searchExp.test(datum[property]);
        return false;
      });
    }

    const { properties } = view;
    if (matched && properties) {
      matched = !Object.keys(properties).some((property) => {
        const value = properties[property];
        if (Array.isArray(value)) return !value.includes(datum[property]);
        return value !== datum[property];
      });
    }
    return matched;
  });
};

export const Controlled = () => {
  const [view, setView] = useState(defaultView);
  const [data, setData] = useState(DATA);
  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Grid
      flex={false}
      pad="large"
      columns={[['small', 'large']]}
      justifyContent="center"
      gap="large"
    >
      <Notification
        status="info"
        message="Data is in 'beta'. The API surface is subject to change."
      />
      <Data
        data={data}
        total={DATA.length}
        view={view}
        onView={(nextView) => {
          setView(nextView);
          setData(filter(nextView));
        }}
      >
        <Toolbar>
          <DataSearch />
          <DataFilters drop>
            <DataFilter
              property="location"
              options={Array.from(new Set(DATA.map((d) => d.location)))
                .filter((v) => v)
                .sort()}
            />
          </DataFilters>
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
  title: 'Data/Data/Controlled',
};
