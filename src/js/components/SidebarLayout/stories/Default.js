import React from 'react';

import {
  Anchor,
  Box,
  Grommet,
  Header,
  Heading,
  Main,
  Menu,
  Nav,
  Paragraph,
  Sidebar,
  SidebarLayout,
  Text,
} from 'grommet';
import { grommet } from 'grommet/themes';
import { User } from 'grommet-icons';

const paragraphFiller = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua.
`;

export const Default = () => (
  <Grommet theme={grommet} full>
    <SidebarLayout
      fill="vertical"
      sidebar={
        <Sidebar
          background="background-contrast"
          header={
            <Header>
              <Text weight="bold">App</Text>
              <SidebarLayout.CloseButton />
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
    >
      <Main pad={{ horizontal: 'medium' }}>
        <Header border="bottom">
          <Box direction="row" align="center">
            <SidebarLayout.ToggleButton />
            <Heading size="small">Welcome</Heading>
          </Box>
          <Menu label="actions" />
        </Header>
        <Paragraph>{paragraphFiller}</Paragraph>
      </Main>
    </SidebarLayout>
  </Grommet>
);

export default {
  title: 'Layout/SidebarLayout/Default',
};
