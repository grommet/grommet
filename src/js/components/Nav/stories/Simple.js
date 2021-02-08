import React from 'react';

import { Anchor, Grommet, Nav } from 'grommet';
import { grommet } from 'grommet/themes';

const items = [
  { label: 'Item A', href: '#' },
  { label: 'Item B', href: '#' },
  { label: 'Item C', href: '#' },
  { label: 'Item D', href: '#' },
];

const SimpleNav = () => (
  <Grommet theme={grommet}>
    <Nav pad="large">
      {items.map(item => (
        <Anchor href={item.href} label={item.label} key={item.label} />
      ))}
    </Nav>
  </Grommet>
);

export const Simple = () => <SimpleNav />;

export default {
  title: 'Controls/Nav/Simple',
};
