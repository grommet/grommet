import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, List } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

import { locations } from './data';

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

storiesOf('List', module).add('theme', () => <ThemedList />);
