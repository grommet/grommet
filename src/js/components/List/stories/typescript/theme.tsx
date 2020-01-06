import React from 'react';
import { storiesOf } from '@storybook/react';
import isChromatic from 'storybook-chromatic/isChromatic';

import { MnetUIBase, Box, List } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';
import { deepMerge } from 'mnet-ui-base/utils';

import { locations } from '../data';

const theme = deepMerge(mnet, {
  list: {
    item: {
      pad: { horizontal: 'large', vertical: 'xsmall' },
      background: ['white', 'light-2'],
      border: true,
    },
  },
});

const ThemedList = () => (
  <MnetUIBase theme={theme}>
    <Box align="center" pad="large">
      <List data={locations} />
    </Box>
  </MnetUIBase>
);

if (!isChromatic()) {
  storiesOf('TypeScript/List', module).add('theme', () => <ThemedList />);
}
