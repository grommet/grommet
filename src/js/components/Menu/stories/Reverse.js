import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Menu } from 'mnet-ui-base';
import { Power, User } from 'grommet-icons';

const Reverse = () => (
  <div>
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
  </div>
);

storiesOf('Menu', module).add('Reverse', () => <Reverse />);
