import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Button, Nav, Text } from 'mnet-ui-base';

const SidebarButton = ({ label, ...rest }) => (
  <Button plain {...rest}>
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

const SidebarNav = () => {
  const [active, setActive] = useState();
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'auto' }}>
      <Box fill direction="row">
        <Nav background="neutral-1">
          {['Dashboard', 'Devices', 'Settings'].map(label => (
            <SidebarButton
              key={label}
              label={label}
              active={label === active}
              onClick={() => setActive(label)}
            />
          ))}
        </Nav>
      </Box>
    </div>
  );
};

storiesOf('Nav', module).add('Sidebar', () => <SidebarNav />);
