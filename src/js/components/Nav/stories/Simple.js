import React from 'react';
import { storiesOf } from '@storybook/react';

import { Anchor, Grommet, Nav } from 'grommet';
import { grommet } from 'grommet/themes';

const items = [
  { label: 'Item A', href: '#' },
  { label: 'Item B', href: '#' },
  { label: 'Item C', href: '#' },
  { label: 'Item D', href: '#' },
];

const Simple = () => (
  <Grommet theme={grommet}>
    <Nav pad="large">
      {items.map(item => (
        <Anchor href={item.href} label={item.label} key={item.label} />
      ))}
    </Nav>
  </Grommet>
);

storiesOf('Nav', module).add('Simple', () => <Simple />);
