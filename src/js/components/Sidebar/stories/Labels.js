import React from 'react';

import {
  Avatar,
  Button,
  Box,
  grommet,
  Grommet,
  Nav,
  Stack,
  Text,
} from 'grommet';

import {
  Analytics,
  Chat,
  Clock,
  Configure,
  Help,
  Projects,
  Split,
  StatusInfoSmall,
} from 'grommet-icons';

import { Sidebar } from '../Sidebar';

const src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';

const SidebarHeader = () => (
  <Box align="center" gap="small" direction="row" margin={{ bottom: 'large' }}>
    <Stack alignSelf="start" align="center" anchor="top-right">
      <Avatar src={src} />
      <Box pad="xsmall" background="orange" round responsive={false} />
    </Stack>
    <Text>Shimrit Yacobi</Text>
  </Box>
);

const SidebarButton = ({ icon, label, ...rest }) => (
  <Box pad="small">
    <Button
      gap="medium"
      alignSelf="start"
      plain
      icon={icon}
      label={label}
      {...rest}
    />
  </Box>
);

const SidebarFooter = () => (
  <Nav>
    <SidebarButton icon={<Chat />} label="Chat" />
    <SidebarButton icon={<Help />} label="Support" />
  </Nav>
);

const MainNavigation = () => (
  <Nav gap="large" responsive={false}>
    <SidebarButton icon={<StatusInfoSmall />} label="Focus" />
    <SidebarButton icon={<Projects />} label="Services" />
    <SidebarButton icon={<Clock />} label="Glances" />
    <SidebarButton icon={<Split />} label="Flows" />
    <SidebarButton icon={<Analytics />} label="Analytics" />
    <SidebarButton icon={<Configure />} label="Configure" />
  </Nav>
);

export const Labels = () => (
  <Grommet theme={grommet} full>
    <Box direction="row" height={{ min: '100%' }}>
      <Sidebar
        responsive={false}
        background="neutral-2"
        header={<SidebarHeader />}
        footer={<SidebarFooter />}
        pad={{ left: 'medium', right: 'large', vertical: 'medium' }}
      >
        <MainNavigation />
      </Sidebar>
    </Box>
  </Grommet>
);

export default {
  title: 'Layout/Sidebar/Labels',
};
