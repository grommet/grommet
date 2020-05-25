import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Menu } from 'mnet-ui-base';

const ControlBottom = () => (
  <div>
    <Box height="medium" justify="center" align="center" pad="large">
      <Menu
        dropProps={{ align: { bottom: 'bottom', left: 'left' } }}
        label="actions"
        items={[
          { label: 'Profile', onClick: () => {} },
          { label: 'Settings', onClick: () => {} },
          { label: 'FAQ', onClick: () => {} },
        ]}
      />
    </Box>
  </div>
);

storiesOf('Menu', module).add('Bottom Control Button', () => <ControlBottom />);
