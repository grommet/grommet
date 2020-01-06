import React from 'react';
import { storiesOf } from '@storybook/react';
import isChromatic from 'storybook-chromatic/isChromatic';

import { MnetUIBase, Header, Main, Text } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

const Simple = () => (
  <MnetUIBase theme={mnet}>
    <Header background="light-4" pad="small">
      <Text size="small">Header</Text>
    </Header>
    <Main pad="small">
      I am Main! Main is a good place to place your content.
    </Main>
  </MnetUIBase>
);

if (!isChromatic()) {
  storiesOf('TypeScript/Main', module).add('Simple', () => <Simple />);
}
