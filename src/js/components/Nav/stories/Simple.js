import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Nav } from 'grommet';
import { grommet } from 'grommet/themes';

const Simple = () => (
  <Grommet theme={grommet}>
    <Nav
      pad="large"
      items={[
        { label: 'Shimi', href: '#' },
        { label: 'Created', href: '#' },
        { label: 'a Simple', href: '#' },
        { label: 'Nav', href: '#' },
      ]}
    />
  </Grommet>
);

storiesOf('Nav', module).add('Simple', () => <Simple />);
