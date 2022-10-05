import React from 'react';
import { Gremlin } from 'grommet-icons';

import { Box, DropButton, Text } from 'grommet';

const renderItems = () => (
  <Box background="dark-1">
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

const align = { top: 'bottom' };

const GremlinDropButton = () => (
  <DropButton
    alignSelf="center"
    margin={{ vertical: 'small' }}
    dropContent={renderItems()}
    dropProps={{ align }}
  >
    <MenuItem />
  </DropButton>
);

const MenuDropButton = () => (
  <Box fill>
    <Box fill="vertical" width="xxsmall" background="dark-2">
      <GremlinDropButton />
      <Box flex />
      <GremlinDropButton />
    </Box>
  </Box>
);

export const Menu = () => <MenuDropButton />;
Menu.parameters = {
  chromatic: { disable: true },
};

Menu.args = {
  full: true,
};

export default {
  title: 'Controls/DropButton/Menu',
};
