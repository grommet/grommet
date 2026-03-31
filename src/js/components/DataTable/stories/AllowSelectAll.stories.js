import React from 'react';

import { Box, DataTable, Text } from 'grommet';
import { CheckBox } from '../../CheckBox';

const DATA = [
  {
    name: 'Alan Josiah Werner Shirleen Foy',
    location: 'Winston Salem',
    date: '2018-01-09',
    percent: 24,
    paid: 3425,
  },
  {
    name: 'Bryan Lane Smallwood Dion Gunderson',
    location: 'Fort Collins',
    date: '2018-06-10',
    percent: 30,
    paid: 1234,
  },
  {
    name: 'Chris Willa Koehler Rocco Bales',
    location: 'Palo Alto',
    date: '2018-06-09',
    percent: 40,
    paid: 2345,
  },
  {
    name: 'Eric Maegan Regalado Kiana Lawton',
    location: 'Palo Alto',
    date: '2018-06-11',
    percent: 80,
    paid: 3456,
  },
  {
    name: 'Doug Yong Cleveland Jule Gantt',
    location: 'Fort Collins',
    date: '2018-06-10',
    percent: 60,
    paid: 1234,
  },
  {
    name: 'Jet Isabella Mcnutt Deedee Bernstein',
    location: 'Palo Alto',
    date: '2018-06-09',
    percent: 40,
    paid: 3456,
  },
  {
    name: 'Michael Corazon Ragan September Hynes',
    location: 'Boise',
    date: '2018-06-11',
    percent: 50,
    paid: 1234,
  },
  {
    name: 'Tracy Kimbery Mccrary Jona Kinsey',
    location: 'San Francisco',
    date: '2018-06-10',
    percent: 10,
    paid: 2345,
  },
];

const columns = [
  { property: 'name', header: 'Name' },
  { property: 'location', header: 'Location' },
  { property: 'date', header: 'Date' },
  { property: 'percent', header: 'Percent' },
  { property: 'paid', header: 'Paid' },
];

export const AllowSelectAll = () => {
  const [allowSelectAll, setAllowSelectAll] = React.useState(true);
  const [select, setSelect] = React.useState([]);

  return (
    <Box justify="center" direction="column" gap="medium" pad="medium">
      <Text>
        When checked, the Select All checkbox of the DataTable is allowed
      </Text>
      <CheckBox
        checked={allowSelectAll}
        label="Allow Select All"
        onChange={(event) => setAllowSelectAll(event.target.checked)}
      />

      <DataTable
        data={DATA}
        columns={columns}
        select={select}
        onSelect={(selected) => setSelect(selected)}
        allowSelectAll={allowSelectAll}
      />
    </Box>
  );
};

AllowSelectAll.storyName = 'Allow Select All';
AllowSelectAll.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Visualizations/DataTable/Allow Select All',
};
