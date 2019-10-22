import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, Menu } from 'grommet';
import { grommet } from 'grommet/themes';

const ControlBottom = () => (
  <Grommet theme={grommet}>
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
  </Grommet>
);

storiesOf('Menu', module).add('Bottom Control Button', () => <ControlBottom />);
