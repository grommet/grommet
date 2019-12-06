import React from 'react';
import { storiesOf } from '@storybook/react';

import {
  Grommet as GrommetIcon,
  FacebookOption,
  Instagram,
  Twitter,
} from 'grommet-icons';

import { Anchor, Box, Footer, grommet, Grommet, Main, Text } from 'grommet';

const Media = () => (
  <Box direction="row" gap="xxsmall" justify="center">
    <Anchor
      a11yTitle="Share feedback on Github"
      href="https://www.instagram.com/"
      icon={<Instagram color="brand" />}
    />
    <Anchor
      a11yTitle="Chat with us on Slack"
      href="https://www.facebook.com/"
      icon={<FacebookOption color="brand" />}
    />
    <Anchor
      a11yTitle="Follow us on Twitter"
      href="https://twitter.com/"
      icon={<Twitter color="brand" />}
    />
  </Box>
);

const Social = () => (
  <Grommet theme={grommet}>
    <Main background="light-2" elevation="large" pad="medium" gap="large">
      <Text margin="small" size="xsmall">
        Main Content
      </Text>
      <Box flex />
    </Main>
    <Footer background="light-4" pad="medium">
      <Box align="center">
        <GrommetIcon color="brand" size="medium" />
        <Text alignSelf="center" color="brand">
          grommet.io
        </Text>
      </Box>
      <Media />
      <Anchor href="/">Sponsors</Anchor>
    </Footer>
  </Grommet>
);

storiesOf('Footer', module).add('Social', () => <Social />);
