import React from 'react';

import { Box, Menu } from 'grommet';
import { User } from 'grommet-icons';

export const Justify = () => (
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
);
Justify.parameters = {
  chromatic: { disable: true },
};
export default {
  title: 'Controls/Menu/Justify',
};
