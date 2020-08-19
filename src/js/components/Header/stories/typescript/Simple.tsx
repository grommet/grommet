import React from 'react';
import { storiesOf } from '@storybook/react';
import isChromatic from 'chromatic/isChromatic';

import { Avatar, Anchor, Nav, Grommet, Header } from 'grommet';
import { grommet } from 'grommet/themes';

const gravatarLink =
  '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';

const Simple = () => (
  <Grommet theme={grommet}>
    <Header background="light-4" pad="small">
      <Avatar src={gravatarLink} />
      <Nav direction="row">
        <Anchor label="Home" href="#" />
        <Anchor label="Profile" href="#" />
      </Nav>
    </Header>
  </Grommet>
);

if (!isChromatic()) {
  storiesOf('TypeScript/Header', module).add('Simple', () => <Simple />);
}
