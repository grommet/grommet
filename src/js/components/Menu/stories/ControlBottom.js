import React from 'react';
import { storiesOf } from '@storybook/react';

import { MnetUIBase, Box, Menu } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

const ControlBottom = () => (
  <MnetUIBase theme={mnet}>
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
  </MnetUIBase>
);

storiesOf('Menu', module).add('Bottom Control Button', () => <ControlBottom />);
