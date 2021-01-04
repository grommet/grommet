import React from 'react';

import { Grommet, Header, Main, Text } from 'grommet';
import { grommet } from 'grommet/themes';

export const Simple = () => (
  <Grommet theme={grommet}>
    <Header background="light-4" pad="small">
      <Text size="small">Header</Text>
    </Header>
    <Main pad="small">
      I am Main! Main is a good place to place your content.
    </Main>
  </Grommet>
);
