import React, { useState } from 'react';

import { Box, Button, Grommet, Nav } from 'grommet';
import { Dashboard, Device, SettingsOption } from 'grommet-icons';

const theme = {
  button: {
    padding: {
      horizontal: '12px',
      vertical: '6px',
    },
    border: {
      width: '0px',
      radius: '1px',
    },
  },
};

const SidebarButton = ({ label, ...rest }) => (
  <Button {...rest} label={label} />
);

const SidebarNav = () => {
  const [active, setActive] = useState();
  return (
    <Grommet full theme={theme}>
      <Box fill direction="row">
        <Nav background="neutral-1">
          {[
            { label: 'Dashboard', icon: <Dashboard />, justify: 'center' },
            { label: 'Devices', icon: <Device />, justify: 'end' },
            { label: 'Settings', icon: <SettingsOption />, justify: 'between' },
          ].map((item) => (
            <SidebarButton
              key={item.label}
              label={item.label}
              active={item.label === active}
              onClick={() => setActive(item.label)}
              icon={item.icon}
              justify={item.justify}
            />
          ))}
        </Nav>
      </Box>
    </Grommet>
  );
};

export const JustifySidebar = () => <SidebarNav />;

JustifySidebar.storyName = 'Justify Sidebar';

export default {
  title: 'Controls/Nav/Custom Themed/Justify Sidebar',
};
