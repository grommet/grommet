import React from 'react';
import { storiesOf } from '@storybook/react';

import { Anchor, Box, MnetUIBase, Header, Nav } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';
import { Avatar } from '../../Header/stories/Simple';

const items = [
  { label: 'HTML', href: '#' },
  { label: 'JS', href: '#' },
  { label: 'CSS', href: '#' },
  { label: 'REACT', href: '#' },
];

const OnHeader = () => (
  <MnetUIBase theme={mnet}>
    <Header background="dark-1" pad="medium">
      <Box direction="row" align="center" gap="small">
        <Avatar />
        <Anchor color="white" href="https://github.com/ShimiSun">
          ShimiSun
        </Anchor>
      </Box>
      <Nav direction="row">
        {items.map(item => (
          <Anchor href={item.href} label={item.label} key={item.label} />
        ))}
      </Nav>
    </Header>
  </MnetUIBase>
);

storiesOf('Nav', module).add('On Header', () => <OnHeader />);
