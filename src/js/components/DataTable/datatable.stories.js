import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import DataTable from './DataTable';
import Grommet from '../Grommet/Grommet';
import Meter from '../Meter/Meter';
import Box from '../Box/Box';
import Text from '../Text/Text';

const amountFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

const columns = [
  {
    property: 'name',
    header: <Text>Name</Text>,
    primary: true,
    footer: 'Total',
  },
  {
    property: 'location',
    header: 'Location',
  },
  {
    property: 'date',
    header: 'Date',
    render: datum => (new Date(datum.date)).toLocaleDateString('en-US'),
    align: 'end',
  },
  {
    property: 'percent',
    header: 'Percent Complete',
    render: datum => (
      <Box pad={{ vertical: 'xsmall' }}>
        <Meter values={[{ value: datum.percent }]} thickness='small' size='small' />
      </Box>
    ),
  },
  {
    property: 'paid',
    header: 'Paid',
    render: datum => amountFormatter.format(datum.paid / 100),
    align: 'end',
    aggregate: 'sum',
    footer: { aggregate: true },
  },
];

const locations = ['Boise', 'Fort Collins', 'Los Gatos', 'Palo Alto', 'San Francisco'];
const data = [];
for (let i = 0; i < 40; i += 1) {
  data.push({
    name: `Name ${i + 1}`,
    location: locations[i % locations.length],
    date: `2018-07-${(i % 30) + 1}`,
    percent: (i % 11) * 10,
    paid: ((i + 1) * 17) % 1000,
  });
}
const DATA = [
  { name: 'Alan', location: 'Los Gatos', date: '2018-06-11', percent: 20, paid: 2345 },
  { name: 'Bryan', location: 'Fort Collins', date: '2018-06-10', percent: 30, paid: 1234 },
  { name: 'Chris', location: 'Palo Alto', date: '2018-06-9', percent: 40, paid: 2345 },
  { name: 'Eric', location: 'Palo Alto', date: '2018-06-11', percent: 80, paid: 3456 },
  { name: 'Doug', location: 'Fort Collins', date: '2018-06-10', percent: 60, paid: 1234 },
  { name: 'Jet', location: 'Palo Alto', date: '2018-06-09', percent: 40, paid: 3456 },
  { name: 'Michael', location: 'Boise', date: '2018-06-11', percent: 50, paid: 1234 },
  { name: 'Tracy', location: 'San Francisco', date: '2018-06-10', percent: 10, paid: 2345 },
];

class SimpleDataTable extends Component {
  render() {
    return (
      <Grommet>
        <DataTable
          columns={columns}
          data={DATA}
        />
      </Grommet>
    );
  }
}

class SizedDataTable extends Component {
  render() {
    return (
      <Grommet>
        <DataTable
          columns={columns}
          data={data}
          size='medium'
        />
      </Grommet>
    );
  }
}

class TunableDataTable extends Component {
  render() {
    return (
      <Grommet>
        <DataTable
          columns={columns.map(c => ({ ...c, search: c.property === 'name' || c.property === 'location' }))}
          data={DATA}
          sortable={true}
          resizeable={true}
        />
      </Grommet>
    );
  }
}

const groupColumns = [...columns];
const first = groupColumns[0];
groupColumns[0] = { ...groupColumns[1] };
groupColumns[1] = { ...first };
groupColumns[0].footer = groupColumns[1].footer;
delete groupColumns[1].footer;

class GroupedDataTable extends Component {
  render() {
    return (
      <Grommet>
        <DataTable
          columns={groupColumns}
          data={DATA}
          groupBy='location'
          sortable={true}
        />
      </Grommet>
    );
  }
}

storiesOf('DataTable', module)
  .add('Simple DataTable', () => <SimpleDataTable />)
  .add('Sized DataTable', () => <SizedDataTable />)
  .add('Tunable DataTable', () => <TunableDataTable />)
  .add('Grouped DataTable', () => <GroupedDataTable />);
