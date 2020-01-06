import React from 'react';
import { storiesOf } from '@storybook/react';

import { MnetUIBase, Box, DropButton, Text } from 'mnet-ui-base';
import { Gremlin } from 'grommet-icons';
import { mnet } from 'mnet-ui-base/themes';

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
    <MnetUIBase theme={mnet} full>
      <Box fill>
        <Box fill="vertical" width="xxsmall" background="dark-2">
          <GremlinDropButton />
          <Box flex />
          <GremlinDropButton />
        </Box>
      </Box>
    </MnetUIBase>
  );
};

storiesOf('DropButton', module).add('Menu', () => <MenuDropButton />);
