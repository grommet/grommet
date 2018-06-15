import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import DataTable from './DataTable';
import Grommet from '../Grommet/Grommet';
import Meter from '../Meter/Meter';
import Box from '../Box/Box';

const amountFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

const COLUMNS = [
  {
    property: 'name',
    label: 'Name',
    primary: true,
    footer: 'Total',
    search: true,
  },
  {
    property: 'location',
    label: 'Location',
    search: true,
  },
  {
    property: 'date',
    label: 'Date',
    render: datum => (new Date(datum.date)).toLocaleDateString('en-US'),
    align: 'end',
    search: true,
  },
  {
    property: 'percent',
    label: 'Percent Complete',
    render: datum => (
      <Box pad={{ vertical: 'xsmall' }}>
        <Meter values={[{ value: datum.percent }]} thickness='small' size='small' />
      </Box>
    ),
    align: 'end',
  },
  {
    property: 'paid',
    label: 'Paid',
    render: datum => amountFormatter.format(datum.paid / 100),
    align: 'end',
    aggregate: 'sum',
    footer: { aggregate: true },
  },
];

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
          columns={COLUMNS}
          data={DATA}
          headerProps={{ border: { side: 'bottom', size: 'small' } }}
          footerProps={{ border: { side: 'top', size: 'small' } }}
          groupBy='location'
          sortable={true}
          resizeable={true}
        />
      </Grommet>
    );
  }
}

storiesOf('DataTable', module)
  .add('Simple DataTable', () => <SimpleDataTable />);
