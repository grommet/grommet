import React, { useState } from 'react';
import {
  Avatar,
  Nav,
  Anchor,
  Menu,
  Button,
  Box,
  Header,
  Heading,
  Layer,
  Paragraph,
  Page,
  PageContent,
  Grid,
  Card,
} from 'grommet';
import { FormClose, Power, User } from 'grommet-icons';

export const Sticky = () => {
  const [open, setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(undefined);

  // eslint-disable-next-line no-unused-vars
  const onSubmit = ({ value, touched }) => {
    // Your submission logic here
  };
  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Page kind="narrow">
      <PageContent>
        <Header
          background="light-3"
          sticky="scrollup"
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
                {
                  label: 'Logout',
                  icon: <Power />,
                  reverse: true,
                  gap: 'small',
                },
              ]}
            />
          </Nav>
        </Header>
        <Box pad="large" align="center">
          <Button label="Show me the Layer" onClick={onOpen} primary />
        </Box>
        <Paragraph>
          To maximize screen real-estate, the Header on this page scrolls out of
          view as the user moves down the page. However if the user scrolls
          upwards, the Header is revealed and fixed atop the window. On long
          pages this behavior allows easy access to the Headers content, such as
          navigation or menus, while preventing the Header from obscuring
          content on mobile devices or in smaller windows.
        </Paragraph>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          commodo gravida tincidunt. Nunc fringilla blandit tortor, id accumsan
          nisi dictum quis. Aenean porttitor at mi id semper. Donec mattis
          bibendum leo, interdum ullamcorper lectus ultrices vel. Fusce nec enim
          faucibus nunc porta egestas. Fusce dapibus lobortis tincidunt.
        </Paragraph>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          commodo gravida tincidunt. Nunc fringilla blandit tortor, id accumsan
          nisi dictum quis. Aenean porttitor at mi id semper. Donec mattis
          bibendum leo, interdum ullamcorper lectus ultrices vel. Fusce nec enim
          faucibus nunc porta egestas. Fusce dapibus lobortis tincidunt.
        </Paragraph>
        <Grid
          rows="small"
          columns={{ count: 'fit', size: 'small' }}
          gap="small"
        >
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          commodo gravida tincidunt. Nunc fringilla blandit tortor, id accumsan
          nisi dictum quis. Aenean porttitor at mi id semper. Donec mattis
          bibendum leo, interdum ullamcorper lectus ultrices vel. Fusce nec enim
          faucibus nunc porta egestas. Fusce dapibus lobortis tincidunt.
        </Paragraph>
      </PageContent>
      {open && (
        <Layer position="right" onClickOutside={onClose} onEsc={onClose}>
          <Box fill="vertical" overflow="auto">
            <Header
              background="light-3"
              sticky="scrollup"
              pad={{ vertical: 'small', horizontal: 'medium' }}
            >
              <Heading margin="none" level={2} size="small">
                Add Monitor
              </Heading>
              <Button icon={<FormClose />} onClick={onClose} />
            </Header>
            <Box pad={{ horizontal: 'medium' }}>
              <Paragraph>
                To maximize screen real-estate, the Header on this page scrolls
                out of view as the user moves down the page. However if the user
                scrolls upwards, the Header is revealed and fixed atop the
                window. On long pages this behavior allows easy access to the
                Headers content, such as navigation or menus, while preventing
                the Header from obscuring content on mobile devices or in
                smaller windows.
              </Paragraph>
              <Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                commodo gravida tincidunt. Nunc fringilla blandit tortor, id
                accumsan nisi dictum quis. Aenean porttitor at mi id semper.
                Donec mattis bibendum leo, interdum ullamcorper lectus ultrices
                vel. Fusce nec enim faucibus nunc porta egestas. Fusce dapibus
                lobortis tincidunt.
              </Paragraph>
              <Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                commodo gravida tincidunt. Nunc fringilla blandit tortor, id
                accumsan nisi dictum quis. Aenean porttitor at mi id semper.
                Donec mattis bibendum leo, interdum ullamcorper lectus ultrices
                vel. Fusce nec enim faucibus nunc porta egestas. Fusce dapibus
                lobortis tincidunt.
              </Paragraph>
            </Box>
          </Box>
        </Layer>
      )}
    </Page>
    // </Grommet>
  );
};

Sticky.storyName = 'Sticky';

export default {
  title: 'Layout/Header/Sticky',
};
