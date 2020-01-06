import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Footer, mnet, MnetUIBase, Main, Text } from 'mnet-ui-base';

const Simple = () => (
  <MnetUIBase theme={mnet}>
    <Main background="light-2" elevation="large" pad="large" gap="large">
      <Text margin="small" size="xsmall">
        Main Content
      </Text>
      <Box flex />
    </Main>
    <Footer background="light-4" justify="center" pad="small">
      <Text textAlign="center" size="small">
        © 2019 Copyright MnetUIBase
      </Text>
    </Footer>
  </MnetUIBase>
);

storiesOf('Footer', module).add('Simple', () => <Simple />);
