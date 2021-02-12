import React from 'react';

import { Grommet, Box, List } from 'grommet';
import { grommet, ThemeType } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

const locations = [
  'Boise',
  'Fort Collins',
  'Los Gatos',
  'Palo Alto',
  'San Francisco',
];

// Type annotations can only be used in TypeScript files.
// Remove ': ThemeType' if you are not using Typescript.
const theme: ThemeType = deepMerge(grommet, {
  list: {
    item: {
      pad: { horizontal: 'large', vertical: 'xsmall' },
      background: ['white', 'light-2'],
      border: true,
    },
  },
});

export const Themed = () => (
  <Grommet theme={theme}>
    <Box align="center" pad="large">
      <List data={locations} />
    </Box>
  </Grommet>
);

export default {
  title: 'Visualizations/List/Themed',
};
