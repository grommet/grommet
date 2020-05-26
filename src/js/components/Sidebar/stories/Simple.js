import React from 'react';
import { storiesOf } from '@storybook/react';

import {
  Avatar,
  Button,
  Box,
  mnet,
  MnetUIBase,
  Nav,
  Sidebar,
} from 'mnet-ui-base';

import {
  Analytics,
  Chat,
  Clock,
  Configure,
  Help,
  Projects,
  StatusInfoSmall,
} from 'grommet-icons';

const SidebarHeader = () => (
  <Avatar border={{ size: 'small', color: 'accent-2' }} background="white">
    SY
  </Avatar>
);

const SidebarFooter = () => (
  <Nav gap="small">
    <Button icon={<Chat />} hoverIndicator />
    <Button icon={<Help />} hoverIndicator />
  </Nav>
);

const MainNavigation = () => (
  <Nav gap="small">
    <Button icon={<StatusInfoSmall />} hoverIndicator />
    <Button icon={<Projects />} hoverIndicator />
    <Button icon={<Clock />} hoverIndicator />
    <Box
      pad="small"
      border={{ color: 'white', side: 'bottom' }}
      hoverIndicator
    />
    <Box gap="small" pad={{ vertical: 'medium' }} hoverIndicator>
      <Button icon={<Analytics />} hoverIndicator />
      <Button icon={<Configure />} hoverIndicator />
    </Box>
  </Nav>
);

export const SidebarIcons = () => (
  <MnetUIBase theme={mnet} full>
    <Box direction="row" height={{ min: '100%' }}>
      <Sidebar
        background="accent-1"
        header={<SidebarHeader />}
        footer={<SidebarFooter />}
      >
        <MainNavigation />
      </Sidebar>
    </Box>
  </MnetUIBase>
);

storiesOf('Sidebar', module).add('Icons', () => <SidebarIcons />);
