import React from 'react';

import { Box, DataTable } from 'grommet';

import { columns } from './data';

// This story uses intentionally-messy values (e.g. mixed case)
// to demonstrate case-insensitive sorting
const DATA = [
  {
    name: 'zoey',
    location: '',
    date: '',
    percent: 0,
    paid: 0,
  },
  {
    name: 'aaron',
    location: '',
    date: '',
    percent: 0,
    paid: 0,
  },
  {
    name: 'Zelda',
    location: '',
    date: '',
    percent: 0,
    paid: 0,
  },
  {
    name: 'Alan',
    location: '',
    date: '',
    percent: 0,
    paid: 0,
  },
  {
    name: 'Bryan',
    location: 'Fort Collins',
    date: '2018-06-10',
    percent: 30,
    paid: 1234,
  },
  {
    name: 'Chris',
    location: 'Palo Alto',
    date: '2018-06-09',
    percent: 40,
    paid: 2345,
  },
  {
    name: 'Eric',
    location: 'Palo Alto',
    date: '2018-06-11',
    percent: 80,
    paid: 3456,
  },
  {
    name: 'Doug',
    location: 'Fort Collins',
    date: '2018-06-10',
    percent: 60,
    paid: 1234,
  },
  {
    name: 'Jet',
    location: 'Palo Alto',
    date: '2018-06-09',
    percent: 40,
    paid: 3456,
  },
  {
    name: 'Michael',
    location: 'Boise',
    date: '2018-06-11',
    percent: 50,
    paid: 1234,
  },
  {
    name: 'Tracy',
    location: 'San Francisco',
    date: '2018-06-10',
    percent: 10,
    paid: 2345,
  },
];

export const Sort = () => {
  const [sort, setSort] = React.useState({
    property: 'name',
    direction: 'desc',
  });
  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <DataTable
        columns={columns.map((c) => ({
          ...c,
          search: c.property === 'name' || c.property === 'location',
        }))}
        data={DATA}
        sort={sort}
        onSort={setSort}
        resizeable
      />
    </Box>
    // </Grommet>
  );
};

export default {
  title: 'Visualizations/DataTable/Sort',
};
