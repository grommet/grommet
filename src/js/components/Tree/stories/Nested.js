import React from 'react';

import { Box, grommet, Heading, Tree, Grommet } from 'grommet';

const data = [
  {
    name: 'All Resources',
    subs: { read: true, write: false, block: false },
  },
  { name: 'Air Group', subs: { read: true, write: false, block: false } },
  {
    name: 'Analytics',
    subs: { read: true, write: false, block: false },
  },
  {
    name: 'Guest Management',
    subs: { read: true, write: false, block: false },
  },
  {
    name: 'Network Management',
    subs: { read: true, write: true, block: false },
    children: [
      {
        name: 'Analytics',
        subs: { read: true, write: true, block: false },
      },
      { name: 'Audit', subs: { read: true, write: true, block: false } },
      {
        name: 'Configuration',
        subs: { read: true, write: true, block: false },
        children: [
          {
            name: 'Analytics',
            subs: { read: true, write: true, block: false },
          },
          {
            name: 'Reports',
            subs: { read: true, write: true, block: false },
          },
        ],
      },
      {
        name: 'Firmware',
        subs: { read: true, write: true, block: false },
      },
    ],
  },
  {
    name: 'Reports',
  },
  {
    name: 'Resource Foo',
    subs: { read: true, write: true, block: false },
    children: [
      {
        name: 'Sub Resource1',
        subs: { read: true, write: false, block: false },
      },
      {
        name: 'Sub Resource2',
        subs: { read: false, write: true, block: false },
      },
    ],
  },
  {
    name: 'Resource Foo1',
  },
  {
    name: 'Resource Foo2',
    subs: { read: true, write: false, block: false },
  },
  {
    name: 'United Communications',
    children: [
      {
        id: 4,
        name: 'Analytics',
        subs: { read: true, write: false, block: false },
      },
      {
        id: 5,
        name: 'Reports',
        subs: { read: false, write: true, block: false },
      },
    ],
  },
  {
    name: 'Virtual Gateways',
  },
];

export const Nested = () => {
  return (
    <Grommet full theme={grommet}>
      <Heading>Aruba Network Manager Permissions</Heading>
      <Box pad="medium">
        <Tree data={data} mode="nested" />
      </Box>
    </Grommet>
  );
};
