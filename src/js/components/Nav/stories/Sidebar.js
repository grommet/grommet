import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, Main, Nav } from 'grommet';
import { grommet } from 'grommet/themes';

const Sidebar = () => (
  <Grommet full theme={grommet} background="dark-1">
    <Box background="dark-1" pad="large" fill>
      <Box direction="row" pad={{ vertical: 'medium' }}>
        <Nav
          pad={{ right: 'xlarge' }}
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

storiesOf('Nav', module).add('Sidebar', () => <Sidebar />);
