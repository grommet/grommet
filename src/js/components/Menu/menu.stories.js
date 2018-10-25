import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, Menu } from 'grommet';
import { grommet } from 'grommet/themes';

const SimpleMenu = () => (
  <Grommet theme={grommet}>
    <Box direction="row" gap="large">
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
