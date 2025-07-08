import React from 'react';

import { Box, Meter, Text, Tip } from 'grommet';

const amountFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

export const columns = [
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
    render: (datum) =>
      datum.date && new Date(datum.date).toLocaleDateString('en-US'),
    align: 'end',
  },
  {
    property: 'percent',
    header: 'Percent Complete',
    render: ({ percent }) => (
      <Box pad={{ vertical: 'xsmall' }}>
        <Meter values={[{ value: percent }]} thickness="small" size="small" />
      </Box>
    ),
  },
  {
    property: 'paid',
    header: 'Paid',
    render: (datum) => amountFormatter.format(datum.paid / 100),
    align: 'end',
    aggregate: 'sum',
    footer: { aggregate: true },
  },
];

export const groupColumns = [...columns];
const first = groupColumns[0];
groupColumns[0] = { ...groupColumns[1] };
groupColumns[1] = { ...first };
groupColumns[0].footer = groupColumns[1].footer;
delete groupColumns[1].footer;

export const locations = [
  'Boise',
  'Fort Collins',
  'Los Gatos',
  'Palo Alto',
  'San Francisco',
];

export const data = [];

for (let i = 0; i < 40; i += 1) {
  data.push({
    name: `Name ${i + 1}`,
    location: locations[i % locations.length],
    date: `2018-07-${(i % 30) + 1}`,
    percent: (i % 11) * 10,
    paid: ((i + 1) * 17) % 1000,
  });
}

export const DATA = [
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

export const storageData = [
  {
    id: 'mjbpiclthh8y',
    poolName: 'Asup-array01-lvs',
    arrays: 'asup-array01-lvs',
    size: 16099511627776,
    pinnable: 2099511627776,
    pinned: 699511627776,
    savings: [
      { unit: 'TiB', value: 12.0 },
      { unit: 'xGHz', value: 333.2 },
    ],
  },
  {
    id: 'hx5f2e57phfb',
    poolName: 'Dev-K8-Sym-R5-3',
    arrays: 'harm-stage-array01',
    size: 224520271234567,
    pinnable: 5099511627776,
    pinned: 2699511627776,
    savings: [
      { unit: 'TiB', value: 8.0 },
      { unit: 'xGHz', value: 333.2 },
    ],
  },
  {
    id: 'om2hy2z79kyz',
    poolName: 'Dev36-erray01',
    arrays: 'harm-stage-array02',
    size: 190655321234567,
    pinnable: 4099511627776,
    pinned: 2699511627776,
    savings: [
      { unit: 'TiB', value: 8.0 },
      { unit: 'xGHz', value: 3955.2 },
    ],
  },
  {
    id: '6d9u4hv95xjq',
    poolName: 'asup-array1',
    arrays: 'harm-stage-array04',
    size: 130655321234567,
    pinnable: 3099511627776,
    pinned: 699511627776,
    savings: [
      { unit: 'TiB', value: 110.6 },
      { unit: 'xGHz', value: 3.9 },
    ],
  },
  {
    id: 'qpsidi3ccnpr',
    poolName: 'Dev-K8-Sym-R5-3',
    arrays: 'Harm-cs-stage-R4-5',
    size: 68994941234567,
    pinnable: 3199511627776,
    pinned: 2699511627776,
    savings: [
      { unit: 'TiB', value: 128.5 },
      { unit: 'xGHz', value: 333.2 },
    ],
  },
  {
    id: 'l3d8xkm0knx4',
    poolName: 'asup-array2',
    arrays: 'ds-array02',
    size: 90655321234567,
    pinnable: 11199511627776,
    pinned: 0,
    savings: [
      { unit: 'TiB', value: 8.0 },
      { unit: 'xGHz', value: 3955.2 },
    ],
  },
  {
    id: 'jsjas87qeqgj',
    poolName: 'Dev36-varray02',
    arrays: 'ds-array01',
    size: 101655321234567,
    pinnable: 12399511627776,
    pinned: 0,
    savings: [
      { unit: 'TiB', value: 8.0 },
      { unit: 'xGHz', value: 333.2 },
    ],
  },
];

export const storageColumns = [
  {
    property: 'poolName',
    header: 'Pool Name',
    render: ({ poolName }) => <Text truncate>{poolName}</Text>,
  },
  {
    property: 'size',
    primary: true,
    header: (
      <Text color="text-strong" weight="bold">
        Size{' '}
        <Text size="xsmall" weight="normal" color="text">
          (TiB)
        </Text>
      </Text>
    ),
    render: (datum) =>
      // bytes to tebibytes
      (datum.size / 2 ** 40).toFixed([1]),
    align: 'end',
  },
  {
    property: 'pinned',
    header: (
      <Box pad={{ horizontal: 'small', vertical: 'xsmall' }}>
        <Text color="text-strong" weight="bold">
          Pinned{' '}
          <Text size="xsmall" weight="normal" color="text">
            %
          </Text>
        </Text>
      </Box>
    ),
    render: ({ pinnable, pinned }) => (
      <Tip
        plain
        dropProps={{ align: { left: 'right' }, stretch: false }}
        content={
          <Box
            background="light-4"
            align="center"
            justify="center"
            width="xxsmall"
            height="xxsmall"
            round="full"
            flex={false}
            margin="xsmall"
          >
            {Math.trunc((pinned / pinnable) * 100)}
          </Box>
        }
      >
        <Box pad={{ vertical: 'xsmall' }}>
          <Meter
            values={[{ value: pinned / pinnable, color: 'graph-0' }]}
            max={1}
            thickness="small"
            size="small"
          />
        </Box>
      </Tip>
    ),
    sortable: false,
  },
  {
    property: 'savings',
    header: (
      <Text color="text-strong" weight="bold">
        Savings{' '}
        <Text size="xsmall" weight="normal" color="text">
          (xGHz)
        </Text>
      </Text>
    ),
    align: 'end',
    render: ({ savings }) => (
      <Text truncate>{savings[1] && `${savings[1].value}`}</Text>
    ),
  },
];
