import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, Menu } from 'grommet';
import { grommet } from 'grommet/themes';
import { FormDown, FormUp } from 'grommet-icons';
import { deepMerge } from 'grommet/utils';

const customTheme = deepMerge(grommet, {
  menu: {
    icons: {
      down: FormDown,
      up: FormUp,
    },
  },
});

const Themed = () => (
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

storiesOf('Menu', module).add('Themed', () => <Themed />);
