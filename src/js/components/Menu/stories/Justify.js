import React from 'react';

import { Box, Grommet, Menu } from 'grommet';
import { User } from 'grommet-icons';
import { hpe } from 'grommet-theme-hpe';

export const Justify = () => (
  <Grommet theme={hpe}>
    <Box pad="small">
      <Menu
        alignSelf="start"
        label="Actions"
        items={[
          { label: 'Hey', icon: <User />, justify: 'center' },
          { label: 'Hello', icon: <User />, justify: 'end' },
          { label: 'Hii', icon: <User /> },
        ]}
      />
    </Box>
  </Grommet>
);

export default {
  title: 'Controls/Menu/Justify',
};
