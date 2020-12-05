import React from 'react';

import {
  CheckBox,
  Box,
  grommet,
  Heading,
  Text,
  TextInput,
  Tree,
  Grommet,
} from 'grommet';
import { Search } from 'grommet-icons';

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

export const Busy = () => {
  return (
    <Grommet full theme={grommet}>
      <Heading>Aruba Network Manager Permissions</Heading>
      <Box pad="medium">
        <Tree data={data} mode="column">
          {datum => (
            <>
              {datum && (
                <Box gap="small">
                  <Box pad={{ bottom: 'medium' }}>
                    <TextInput
                      icon={<Search />}
                      placeholder="Search permissions ..."
                    />
                  </Box>
                  <Text weight="bold">{datum?.name}</Text>
                  {datum.subs &&
                    Object.entries(datum.subs).map(([key, value]) => (
                      <CheckBox key={key} label={key} checked={value} />
                    ))}
                </Box>
              )}
            </>
          )}
        </Tree>
      </Box>
    </Grommet>
  );
};
