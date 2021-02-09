import React from 'react';

import { Grommet, Anchor, Box } from 'grommet';
import { Add } from 'grommet-icons';

const customTheme = {
  global: {
    colors: {
      custom: '#cc6633',
    },
  },
};

export const Theme = () => (
  <Grommet theme={customTheme}>
    <Box pad="medium">
      <Anchor icon={<Add />} label="Add" color="custom" />
    </Box>
  </Grommet>
);

export default {
  title: 'Utilities/Grommet/Theme',
};
