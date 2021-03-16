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
import { User } from 'grommet-icons';

const paragraphFiller = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua.
`;

export const SidebarMain = () => (
  <Grommet theme={grommet} full>
    <Columns
      fill="vertical"
      center={false}
      sidebar={
        <Sidebar
          background="background-contrast"
          header={
            <Header>
              <Text weight="bold">App</Text>
              <Columns.SidebarCloseButton />
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
      }
      gutter="none"
    >
      <Main pad={{ horizontal: 'medium' }}>
        <Header border="bottom">
          <Box direction="row" align="center">
            <Columns.SidebarToggleButton />
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
