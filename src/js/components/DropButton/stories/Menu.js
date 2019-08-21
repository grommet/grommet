import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, DropButton, Text } from 'grommet';
import { Gremlin } from 'grommet-icons';
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
const MenuDropButton = () => {
  return (
    <Grommet theme={grommet} full>
      <Box fill>
        <Box fill="vertical" width="xxsmall" background="dark-2">
          <DropButton
            alignSelf="center"
            margin={{ vertical: 'small' }}
            dropContent={renderItems()}
            dropProps={{ align: { top: 'bottom' } }}
          >
            <MenuItem />
          </DropButton>
          <Box flex />
          <DropButton
            alignSelf="center"
            margin={{ vertical: 'small' }}
            dropContent={renderItems()}
            dropProps={{ align: { top: 'bottom' } }}
          >
            <MenuItem />
          </DropButton>
        </Box>
      </Box>
    </Grommet>
  );
};

storiesOf('DropButton', module).add('Menu', () => <MenuDropButton />);
