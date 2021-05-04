import React from 'react';

import {
  Anchor,
  Box,
  Columns,
  Grommet,
  Header,
  Heading,
  Main,
  Menu,
  Nav,
  Paragraph,
  Sidebar,
  Text,
} from 'grommet';
import { grommet } from 'grommet/themes';
import { Close, User } from 'grommet-icons';

const paragraphFiller = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua.
`;

export const SidebarMain = () => (
  <Grommet theme={grommet} full>
    <Columns
      fill
      // desktop: don't allow hiding Sidebar
      // mobile: start with Sidebar hidden then show in a layer
      columns={[
        { hide: false, responsive: { hide: true, layer: true }, width: 'auto' },
      ]}
    >
      <Sidebar
        background="background-contrast"
        header={
          <Header>
            <Text weight="bold">App</Text>
            <Columns.ControlButton child={0} icon={<Close />} />
          </Header>
        }
        footer={
          <Menu
            icon={<User />}
            items={[{ label: 'Logout' }]}
            dropProps={{ align: { bottom: 'bottom' } }}
          />
        }
        width="small"
      >
        <Nav>
          <Anchor label="Home" hoverIndicator />
          <Anchor label="Items" hoverIndicator />
        </Nav>
      </Sidebar>
      <Main pad={{ horizontal: 'medium' }}>
        <Header border="bottom">
          <Box direction="row" align="center">
            <Columns.ControlButton child={0} />
            <Heading size="small">Welcome</Heading>
          </Box>
          <Menu label="actions" />
        </Header>
        <Paragraph>{paragraphFiller}</Paragraph>
      </Main>
    </Columns>
  </Grommet>
);

export default {
  title: 'Layout/Columns/Sidebar Main',
};
