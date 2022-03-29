import React from 'react';
import {
  Anchor,
  Avatar,
  Card,
  Grid,
  Header,
  Nav,
  Menu,
  Page,
  PageContent,
  Paragraph,
} from 'grommet';
import { Power, User } from 'grommet-icons';

export const Sticky = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Page>
    <PageContent background={{ color: 'light-3', fill: 'horizontal' }}>
      <Header
        sticky="scrollup"
        background="light-4"
        pad={{ vertical: 'small' }}
      >
        <Avatar background="brand">SY</Avatar>
        <Nav align="center" direction="row">
          <Anchor label="Home" href="#" />
          <Menu
            dropProps={{ align: { top: 'bottom', left: 'left' } }}
            label="Profile"
            items={[
              { label: 'Home' },
              { label: 'Profile', icon: <User />, gap: 'small' },
              { label: 'Logout', icon: <Power />, reverse: true, gap: 'small' },
            ]}
          />
        </Nav>
      </Header>
      <Paragraph>
        To maximize screen real-estate, the Header on this page scrolls out of view as the user moves down the page. However if the user scrolls upwards, the Header is revealed and fixed atop the window. On long pages this behavior allows easy access to the Header's content, such as navigation or menus, while preventing the Header from obscuring content on mobile devices or in smaller windows.
      </Paragraph>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer commodo
        gravida tincidunt. Nunc fringilla blandit tortor, id accumsan nisi
        dictum quis. Aenean porttitor at mi id semper. Donec mattis bibendum
        leo, interdum ullamcorper lectus ultrices vel. Fusce nec enim faucibus
        nunc porta egestas. Fusce dapibus lobortis tincidunt.
      </Paragraph>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer commodo
        gravida tincidunt. Nunc fringilla blandit tortor, id accumsan nisi
        dictum quis. Aenean porttitor at mi id semper. Donec mattis bibendum
        leo, interdum ullamcorper lectus ultrices vel. Fusce nec enim faucibus
        nunc porta egestas. Fusce dapibus lobortis tincidunt.
      </Paragraph>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer commodo
        gravida tincidunt. Nunc fringilla blandit tortor, id accumsan nisi
        dictum quis. Aenean porttitor at mi id semper. Donec mattis bibendum
        leo, interdum ullamcorper lectus ultrices vel. Fusce nec enim faucibus
        nunc porta egestas. Fusce dapibus lobortis tincidunt.
      </Paragraph>
      <Grid rows="small" columns={{ count: 'fit', size: 'small' }} gap="small">
        <Card background="white" pad="large">
          Card
        </Card>
        <Card background="white" pad="large">
          Card
        </Card>
        <Card background="white" pad="large">
          Card
        </Card>
      </Grid>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer commodo
        gravida tincidunt. Nunc fringilla blandit tortor, id accumsan nisi
        dictum quis. Aenean porttitor at mi id semper. Donec mattis bibendum
        leo, interdum ullamcorper lectus ultrices vel. Fusce nec enim faucibus
        nunc porta egestas. Fusce dapibus lobortis tincidunt.
      </Paragraph>
    </PageContent>
  </Page>
  // </Grommet>
);
Sticky.storyName = 'Sticky';

export default {
  title: 'Layout/Header/Sticky',
};
