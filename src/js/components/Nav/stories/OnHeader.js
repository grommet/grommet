import React from 'react';

import { Avatar, Anchor, Box, Header, Nav } from 'grommet';

const items = [
  { label: 'HTML', href: '#' },
  { label: 'JS', href: '#' },
  { label: 'CSS', href: '#' },
  { label: 'REACT', href: '#' },
];

const gravatarSrc =
  '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';

const OnHeaderNav = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={grommet}>
  <Header background="dark-1" pad="small">
    <Box direction="row" align="center" gap="small">
      <Avatar src={gravatarSrc} />
      <Anchor color="white" href="https://github.com/ShimiSun">
        ShimiSun
      </Anchor>
    </Box>
    <Nav direction="row">
      {items.map((item) => (
        <Anchor href={item.href} label={item.label} key={item.label} />
      ))}
    </Nav>
  </Header>
  // </Grommet>
);

export const OnHeader = () => <OnHeaderNav />;
OnHeader.storyName = 'On Header';

export default {
  title: 'Controls/Nav/On Header',
};
