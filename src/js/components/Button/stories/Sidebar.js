import React from 'react';
import { storiesOf } from '@storybook/react';

import { grommet, Box, Button, Grommet, Text } from 'grommet';

const SidebarButton = ({ label, onClick }) => (
  <Button plain onClick={onClick}>
    {({ hover }) => (
      <Box
        background={hover ? 'accent-1' : undefined}
        pad={{ horizontal: 'large', vertical: 'medium' }}
      >
        <Text size="large">{label}</Text>
      </Box>
    )}
  </Button>
);

const SidebarButtons = () => (
  <Grommet full theme={grommet}>
    <Box fill direction="row">
      <Box background="neutral-1">
        <SidebarButton label="Dashboard" onClick={() => {}} />
        <SidebarButton label="Devices" onClick={() => {}} />
        <SidebarButton label="Settings" onClick={() => {}} />
      </Box>
    </Box>
  </Grommet>
);

storiesOf('Button', module).add('Sidebar', () => <SidebarButtons />);
