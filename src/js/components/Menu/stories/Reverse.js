import React from 'react';

import { Grommet, Box, Menu } from 'grommet';
import { Power, User } from 'grommet-icons';
import { grommet } from 'grommet/themes';

const ReverseMenu = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <Menu
        dropProps={{ align: { top: 'bottom', left: 'left' } }}
        label="actions"
        items={[
          { label: 'Home' },
          { label: 'Profile', icon: <User />, gap: 'small' },
          { label: 'Logout', icon: <Power />, reverse: true, gap: 'small' },
        ]}
      />
    </Box>
  </Grommet>
);

export const Reverse = () => <ReverseMenu />;
Reverse.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Controls/Menu/Reverse',
};
