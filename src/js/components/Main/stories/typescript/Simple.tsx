import React from 'react';
import { storiesOf } from '@storybook/react';
import isChromatic from 'storybook-chromatic/isChromatic';

import { Header, Main, Text } from 'mnet-ui-base';

const Simple = () => (
  <>
    <Header background="light-4" pad="small">
      <Text size="small">Header</Text>
    </Header>
    <Main pad="small">
      I am Main! Main is a good place to place your content.
    </Main>
  </>
);

if (!isChromatic()) {
  storiesOf('TypeScript/Main', module).add('Simple', () => <Simple />);
}
