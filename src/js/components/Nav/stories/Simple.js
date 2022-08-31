import React from 'react';

import { Anchor, Nav } from 'grommet';

const items = [
  { label: 'Item A', href: '#' },
  { label: 'Item B', href: '#' },
  { label: 'Item C', href: '#' },
  { label: 'Item D', href: '#' },
];

const SimpleNav = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={grommet}>
  <Nav pad="large">
    {items.map((item) => (
      <Anchor href={item.href} label={item.label} key={item.label} />
    ))}
  </Nav>
  // </Grommet>
);

export const Simple = () => <SimpleNav />;

export default {
  title: 'Controls/Nav/Simple',
};
