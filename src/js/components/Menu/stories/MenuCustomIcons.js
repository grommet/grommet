import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, Menu } from 'grommet';
import { grommet } from 'grommet/themes';
import { Menu as HamburgerMenu, Close } from 'grommet-icons';
import { deepMerge } from '../../../utils';

const customTheme = deepMerge(grommet, {
  menu: {
    icons: {
      down: HamburgerMenu,
      open: Close,
    },
  },
});

const MenuCustomIcons = () => (
  <Grommet theme={customTheme}>
    <Box align="center" pad="large">
      <Menu
        dropProps={{
          align: { top: 'bottom', left: 'left' },
          elevation: 'xlarge',
        }}
        label="actions"
        items={[
          { label: 'Launch', onClick: () => {} },
          { label: 'Abort', onClick: () => {} },
          { label: 'Disabled', disabled: true },
        ]}
      />
    </Box>
  </Grommet>
);

storiesOf('Menu', module).add('Menu with different icons', () => (
  <MenuCustomIcons />
));
