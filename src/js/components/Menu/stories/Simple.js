import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Menu } from 'mnet-ui-base';

const SimpleMenu = () => (
  <>
    <Box align="center" pad="large">
      <Menu
        dropProps={{ align: { top: 'bottom', left: 'left' } }}
        label="actions"
        items={[
          { label: 'Launch', onClick: () => {} },
          { label: 'Abort', onClick: () => {} },
          { label: 'Disabled', disabled: true },
        ]}
      />
    </Box>
  </>
);

storiesOf('Menu', module).add('Simple', () => <SimpleMenu />);
