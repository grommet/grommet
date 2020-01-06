import React from 'react';
import { storiesOf } from '@storybook/react';

import { MnetUIBase, Box, Menu } from 'mnet-ui-base';
import { Power, User } from 'grommet-icons';
import { mnet } from 'mnet-ui-base/themes';

const Reverse = () => (
  <MnetUIBase theme={mnet}>
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
  </MnetUIBase>
);

storiesOf('Menu', module).add('Reverse', () => <Reverse />);
