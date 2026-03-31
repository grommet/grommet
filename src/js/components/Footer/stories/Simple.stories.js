import React from 'react';

import { Box, Footer, Main, Text } from 'grommet';

export const Simple = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box>
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
  </Box>
  // </Grommet>
);

export default {
  title: 'Layout/Footer/Simple',
};
