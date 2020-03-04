import React from 'react';
import { storiesOf } from '@storybook/react';

import { Anchor, Box, MnetUIBase, Main, Nav } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';
import { deepMerge } from 'mnet-ui-base/utils';

const navItems = [
  { label: 'HTML', href: '#' },
  { label: 'JS', href: '#' },
  { label: 'CSS', href: '#' },
  { label: 'REACT', href: '#' },
];

const customTheme = deepMerge(mnet, {
  anchor: {
    textDecoration: 'none',
    fontWeight: 500,
    color: {
      dark: 'white',
      light: 'neutral-2',
    },
    hover: {
      textDecoration: 'none',
      fontWeight: 700,
    },
  },
});

const CustomAnchor = () => (
  <MnetUIBase full theme={customTheme}>
    <Box background="dark-1" pad="large" fill>
      <Box direction="row" pad={{ vertical: 'medium' }}>
        <Nav width="small" margin={{ right: 'large' }}>
          {navItems.map(item => (
            <Anchor href={item.href} label={item.label} key={item.label} />
          ))}
        </Nav>
        <Main>Place main content here</Main>
      </Box>
    </Box>
  </MnetUIBase>
);

storiesOf('Nav', module).add('Custom Anchor', () => <CustomAnchor />);
