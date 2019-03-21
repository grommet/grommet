import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { grommet, Box, Button, Grommet, Text } from 'grommet';

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

const SidebarButtons = () => {
  const [active, setActive] = useState();
  return (
    <Grommet full theme={grommet}>
      <Box fill direction="row">
        <Box background="neutral-1">
          {['Dashboard', 'Devices', 'Settings'].map(label => (
            <SidebarButton
              key={label}
              label={label}
              active={label === active}
              onClick={() => setActive(label)}
            />
          ))}
        </Box>
      </Box>
    </Grommet>
  );
};

storiesOf('Button', module).add('Sidebar', () => <SidebarButtons />);
