import React from 'react';
import { storiesOf } from '@storybook/react';
import isChromatic from 'chromatic/isChromatic';

import { Grommet, Box, List } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

export const locations = [
  'Boise',
  'Fort Collins',
  'Los Gatos',
  'Palo Alto',
  'San Francisco',
];

const theme = deepMerge(grommet, {
  list: {
    item: {
      pad: { horizontal: 'large', vertical: 'xsmall' },
      background: ['white', 'light-2'],
      border: true,
    },
  },
});

const ThemedList = () => (
  <Grommet theme={theme}>
    <Box align="center" pad="large">
      <List data={locations} />
    </Box>
  </Grommet>
);

if (!isChromatic()) {
  storiesOf('TypeScript/List', module).add('theme', () => <ThemedList />);
}
