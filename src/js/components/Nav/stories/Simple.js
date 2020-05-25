import React from 'react';
import { storiesOf } from '@storybook/react';

import { Anchor, Nav } from 'mnet-ui-base';

const items = [
  { label: 'Item A', href: '#' },
  { label: 'Item B', href: '#' },
  { label: 'Item C', href: '#' },
  { label: 'Item D', href: '#' },
];

const Simple = () => (
  <>
    <Nav pad="large">
      {items.map(item => (
        <Anchor href={item.href} label={item.label} key={item.label} />
      ))}
    </Nav>
  </>
);

storiesOf('Nav', module).add('Simple', () => <Simple />);
