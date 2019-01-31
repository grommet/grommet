import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, Menu } from '..';
import { grommet } from '../../themes';

const SimpleMenu = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <Menu
        label="Actions"
        items={[
          { label: 'Launch', onClick: () => {} },
          { label: 'Abort', onClick: () => {} },
        ]}
      />
    </Box>
  </Grommet>
);

storiesOf('Menu', module).add('Simple Menu', () => <SimpleMenu />);
