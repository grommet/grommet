import React from 'react';
import { Gremlin } from 'grommet-icons';

import { Grommet, Box, DropButton, Text } from 'grommet';
import { grommet } from 'grommet/themes';

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

const MenuDropButton = () => (
  <Grommet theme={grommet} full>
    <Box fill>
      <Box fill="vertical" width="xxsmall" background="dark-2">
        <GremlinDropButton />
        <Box flex />
        <GremlinDropButton />
      </Box>
    </Box>
  </Grommet>
);

export const Menu = () => <MenuDropButton />;
Menu.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Controls/DropButton/Menu',
};
