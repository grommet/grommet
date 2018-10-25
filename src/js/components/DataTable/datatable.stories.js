import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, DataTable, Meter, Text } from 'grommet';
import { grommet } from 'grommet/themes';

const amountFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

const columns = [
  {
    property: 'name',
    header: <Text>Name with extra</Text>,
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
    render: datum => new Date(datum.date).toLocaleDateString('en-US'),
    align: 'end',
  },
  {
    property: 'percent',
    header: 'Percent Complete',
    render: datum => (
      <Box pad={{ vertical: 'xsmall' }}>
        <Meter
          values={[{ value: datum.percent }]}
          thickness="small"
          size="small"
        />
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

const locations = [
  'Boise',
  'Fort Collins',
  'Los Gatos',
  'Palo Alto',
  'San Francisco',
];
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
  {
    name: 'Alan',
    location: 'Los Gatos',
    date: '2018-06-11',
    percent: 20,
    paid: 2345,
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

const SimpleDataTable = () => (
  <Grommet theme={grommet}>
    <DataTable columns={columns} data={DATA} />
  </Grommet>
);

const SizedDataTable = () => (
  <Grommet theme={grommet}>
    <DataTable columns={columns} data={data} size="medium" />
  </Grommet>
);

const TunableDataTable = () => (
  <Grommet theme={grommet}>
    <DataTable
      columns={columns.map(c => ({
        ...c,
        search: c.property === 'name' || c.property === 'location',
      }))}
      data={DATA}
      sortable
      resizeable
    />
  </Grommet>
);

const groupColumns = [...columns];
const first = groupColumns[0];
groupColumns[0] = { ...groupColumns[1] };
groupColumns[1] = { ...first };
groupColumns[0].footer = groupColumns[1].footer;
delete groupColumns[1].footer;

const GroupedDataTable = () => (
  <Grommet theme={grommet}>
    <DataTable columns={groupColumns} data={DATA} groupBy="location" sortable />
  </Grommet>
);

class ServedDataTable extends Component {
  state = { data: DATA };

  onSearch = search => {
    let nextData;
    if (search) {
      const expressions = Object.keys(search).map(property => ({
        property,
        exp: new RegExp(search[property], 'i'),
      }));
      nextData = DATA.filter(
        d => !expressions.some(e => !e.exp.test(d[e.property]))
      );
    } else {
      nextData = DATA;
    }
    this.setState({ data: nextData });
  };

  render() {
    const { data: servedData } = this.state;
    return (
      <Grommet theme={grommet}>
        <DataTable
          columns={columns.map(column => ({
            ...column,
            search:
              column.property === 'name' || column.property === 'location',
          }))}
          data={servedData}
          onSearch={this.onSearch}
        />
      </Grommet>
    );
  }
}

storiesOf('DataTable', module)
  .add('Simple DataTable', () => <SimpleDataTable />)
  .add('Sized DataTable', () => <SizedDataTable />)
  .add('Tunable DataTable', () => <TunableDataTable />)
  .add('Grouped DataTable', () => <GroupedDataTable />)
  .add('Served DataTable', () => <ServedDataTable />);
