import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, List } from 'grommet';
import { grommet } from 'grommet/themes';

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
    entry: `entry-${i + 1}`,
    location: locations[i % locations.length],
  });
}

const SecondaryKeyList = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <List
        data={data.slice(0, 10)}
        primaryKey="entry"
        secondaryKey="location"
      />
    </Box>
  </Grommet>
);

storiesOf('List', module).add('secondaryKey', () => <SecondaryKeyList />);
