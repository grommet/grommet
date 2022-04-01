import React, { useState } from 'react';
import {
  Anchor,
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  Header,
  Layer,
  Nav,
  Page,
  PageContent,
  Paragraph,
  Text,
} from 'grommet';
import { FormClose } from 'grommet-icons';

export const Test = () => {
  const [open, setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(undefined);
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  return (
    <Page>
      <PageContent background={{ color: 'light-3', fill: 'horizontal' }}>
        <Header
          sticky={{ type: 'scrollup' }}
          background="light-4"
          pad={{ vertical: 'small' }}
        >
          <Avatar background="brand">SY</Avatar>
          <Nav direction="row">
            <Anchor label="Home" href="#" />
            <Anchor label="Profile" href="#" />
          </Nav>
        </Header>
        {open && (
          <Layer modal={false} position="center" full="vertical">
            <Box fill style={{ minWidth: '378px' }}>
              <Box
                direction="row"
                align="center"
                as="header"
                elevation="small"
                justify="between"
              >
                <Text margin={{ left: 'small' }}>Header</Text>
                <Button icon={<FormClose />} />
              </Box>
              <Box flex overflow="auto" pad="xsmall">
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
                <span>body</span>
              </Box>
              <Box
                as="footer"
                border={{ side: 'top' }}
                pad="small"
                justify="end"
                direction="row"
                align="center"
              >
                <Button onClick={() => onClose()} primary label="Save" />
              </Box>
            </Box>
          </Layer>
        )}
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
        <Box pad="medium" align="start">
          <Button label="Show me the Layer" onClick={onOpen} primary />
        </Box>
      </PageContent>
    </Page>
    // </Grommet>
  );
};
Test.storyName = 'Test';

export default {
  title: 'Layout/Header/Test',
};
