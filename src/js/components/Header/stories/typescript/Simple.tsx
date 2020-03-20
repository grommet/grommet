import React from 'react';
import { storiesOf } from '@storybook/react';
import isChromatic from 'storybook-chromatic/isChromatic';

import { Link, Box, Grommet, Header } from 'grommet';
import { grommet } from 'grommet/themes';

export const Avatar = () => (
  <Box
    height="xxsmall"
    width="xxsmall"
    round="full"
    // eslint-disable-next-line max-len
    background="url(//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80)"
  />
);

const Simple = () => (
  <Grommet theme={grommet}>
    <Header background="light-4" pad="small">
      <Avatar />
      <Box direction="row" gap="medium">
        <Link label="Home" href="#home" />
        <Link label="Profile" href="#profile" />
      </Box>
    </Header>
  </Grommet>
);

if (!isChromatic()) {
  storiesOf('TypeScript/Header', module).add('Simple', () => <Simple />);
}
