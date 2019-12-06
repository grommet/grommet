import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Footer, grommet, Grommet, Main, Text } from 'grommet';

const Simple = () => (
  <Grommet theme={grommet}>
    <Main background="light-2" elevation="large" pad="large" gap="large">
      <Text margin="small" size="xsmall">
        Main Content
      </Text>
      <Box flex />
    </Main>
    <Footer background="light-4" justify="center" pad="small">
      <Text textAlign="center" size="small">
        © 2019 Copyright Grommet
      </Text>
    </Footer>
  </Grommet>
);

storiesOf('Footer', module).add('Simple', () => <Simple />);
