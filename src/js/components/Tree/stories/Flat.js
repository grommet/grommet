import React from 'react';

import { CheckBox, Box, grommet, Heading, Text, Tree, Grommet } from 'grommet';

const data = [
  {
    name: 'Network Management',
    subs: { read: true, write: false, block: false },
  },
  {
    name: 'All Resources',
    subs: { read: true, write: true, block: false },
  },
  { name: 'Air Group', subs: { read: true, write: false, block: true } },

  {
    name: 'Analytics',
    subs: { read: false, write: false, block: false },
  },
  {
    name: 'Guest Management',
    subs: { read: true, write: true, block: true },
  },
];

export const Flat = () => {
  return (
    <Grommet full theme={grommet}>
      <Heading>Aruba Network Manager Permissions</Heading>
      <Tree data={data} mode="column">
        {datum => (
          <>
            {datum && (
              <Box gap="small">
                <Text weight="bold">{datum?.name}</Text>
                {Object.entries(datum.subs).map(([key, value]) => (
                  <CheckBox key={key} label={key} checked={value} />
                ))}
              </Box>
            )}
          </>
        )}
      </Tree>
    </Grommet>
  );
};
