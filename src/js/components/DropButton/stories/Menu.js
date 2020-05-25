import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, DropButton, Text } from 'mnet-ui-base';
import { Gremlin } from 'grommet-icons';

const renderItems = () => (
  <Box>
    <Text>hi</Text>
    <Text>hi</Text>
    <Text>hi</Text>
    <Text>hi</Text>
  </Box>
);

const MenuItem = () => (
  <Box height="36px" width="36px" align="center">
    <Gremlin />
  </Box>
);

const GremlinDropButton = () => (
  <DropButton
    alignSelf="center"
    margin={{ vertical: 'small' }}
    dropContent={renderItems()}
    dropProps={{ align: { top: 'bottom' } }}
  >
    <MenuItem />
  </DropButton>
);
const MenuDropButton = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'auto' }}>
      <Box fill>
        <Box fill="vertical" width="xxsmall" background="dark-2">
          <GremlinDropButton />
          <Box flex />
          <GremlinDropButton />
        </Box>
      </Box>
    </div>
  );
};

storiesOf('DropButton', module).add('Menu', () => <MenuDropButton />);
