import React from 'react';

import { Grommet, Box, List } from 'grommet';
import { grommet } from 'grommet/themes';

const locations = [
  'Boise',
  'Fort Collins',
  'Los Gatos',
  'Palo Alto',
  'San Francisco',
];

export const Basic = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <List data={locations} />
    </Box>
  </Grommet>
);

export default {
  title: 'Visualizations/List/Basic',
};
