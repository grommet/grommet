import React from 'react';
import { storiesOf } from '@storybook/react';
import isChromatic from 'storybook-chromatic/isChromatic';

import { Box, Grommet, Main, Nav } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

const customTheme = deepMerge(grommet, {
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

const Sidebar = () => (
  <Grommet full theme={customTheme}>
    <Box background="dark-1" pad="large" fill>
      <Box direction="row" pad={{ vertical: 'medium' }}>
        <Nav
          width="small"
          margin={{ right: 'large' }}
          items={[
            { label: 'HTML', href: '#' },
            { label: 'JS', href: '#' },
            { label: 'CSS', href: '#' },
            { label: 'REACT', href: '#' },
          ]}
        />
        <Main>Place main content here</Main>
      </Box>
    </Box>
  </Grommet>
);

if (!isChromatic()) {
  storiesOf('TypeScript/Nav', module).add('Sidebar', () => <Sidebar />);
}
