import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Footer, grommet, Grommet, Main, Text } from 'grommet';

const Simple = () => (
  <Grommet theme={grommet}>
    <Main
      background="light-1"
      elevation="large"
      pad={{ top: 'large' }}
      gap="large"
    >
      <Text margin="small" size="xsmall">
        Main Content
      </Text>
      <Box flex />
      <Footer background="light-4" justify="center">
        <Box pad="small">
          <Text textAlign="center" size="small">
            © 2019 Copyright
          </Text>
          <Text textAlign="center" color="brand" size="xsmall">
            Grommet.io
          </Text>
        </Box>
      </Footer>
    </Main>
  </Grommet>
);

storiesOf('Footer', module).add('Simple', () => <Simple />);
