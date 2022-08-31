import React from 'react';

import { Box, Menu } from 'grommet';
import { Home, User } from 'grommet-icons';

export const Justify = () => (
  <Box pad="small">
    <Menu
      alignSelf="start"
      label="Actions"
      items={[
        { label: 'User', icon: <User />, justify: 'center' },
        { label: 'Users', icon: <User />, justify: 'end' },
        { label: 'Home', icon: <Home /> },
      ]}
    />
  </Box>
);
Justify.parameters = {
  chromatic: { disable: true },
};
export default {
  title: 'Controls/Menu/Justify',
};
