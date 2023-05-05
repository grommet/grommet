import React from 'react';

import {
  Grid,
  DataTable,
  DataFilters,
  DataSearch,
  DataSummary,
  Notification,
  Text,
  Toolbar,
} from 'grommet';

import { Data } from '../Data';

const data = [
  {
    id: 1,
    name: 'Alpha',
    location: { city: 'Athens', country: 'Greece' },
    economy: { GDP: 100 },
    colors: ['white', 'blue'],
  },
  {
    id: 2,
    name: 'Beta',
    location: { city: 'Bangkok', country: 'Thailand' },
    economy: { GDP: 150 },
    colors: ['red', 'white', 'blue'],
  },
  {
    id: 3,
    name: 'Theta',
    location: { city: 'Berlin', country: 'Germany' },
    economy: { GDP: 200 },
    colors: ['red', 'yellow', 'black'],
  },
];

const properties = {
  name: { label: 'Name', search: true },
  'location.city': { label: 'City' },
  'economy.GDP': { label: 'GDP' },
  colors: {
    label: 'Flag Colors',
    options: [
      { label: 'Red', value: 'red' },
      { label: 'White', value: 'white' },
      { label: 'Blue', value: 'blue' },
      { label: 'Yellow', value: 'yellow' },
      { label: 'Black', value: 'black' },
      { label: 'Green', value: 'green' },
      { label: 'Orange', value: 'orange' },
      { label: 'Gray', value: 'gray' },
    ],
    search: true,
  },
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
  {
    property: 'colors',
    header: 'Flag Colors',
    // render using map map
    render: (datum) =>
      datum.colors.map((item) => <Text key={item}>{item}</Text>),
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
    <Data data={data} properties={properties}>
      <Toolbar>
        <DataSearch />
        <DataFilters layer />
      </Toolbar>
      <DataSummary />
      <DataTable columns={columns} verticalAlign={{ body: 'top' }} />
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
