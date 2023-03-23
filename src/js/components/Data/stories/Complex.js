import React from 'react';

import { Grid, DataTable, Notification } from 'grommet';

import { Data } from '../Data';

const data = [
  {
    id: 1,
    name: 'Alpha',
    location: { city: 'Athens', country: 'Greece' },
    economy: { GDP: 100 },
  },
  {
    id: 2,
    name: 'Beta',
    location: { city: 'Bangkok', country: 'Thailand' },
    economy: { GDP: 150 },
  },
];

const properties = {
  name: { label: 'Name', search: true },
  'location.city': { label: 'City' },
  'economy.GDP': { label: 'GDP' },
};

const columns = [
  {
    property: 'name',
    header: 'Name',
    primary: true,
  },
  {
    property: 'location.city',
    header: 'City',
  },
  {
    property: 'economy.GDP',
    header: 'GDP',
  },
];

export const Complex = () => (
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
    <Data data={data} properties={properties} toolbar>
      <DataTable columns={columns} />
    </Data>
  </Grid>
  // </Grommet>
);

Complex.args = {
  full: true,
};

export default {
  title: 'Data/Data/Complex',
};
