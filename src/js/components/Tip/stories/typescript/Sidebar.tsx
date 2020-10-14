import React, { useRef, useState } from 'react';
import { storiesOf } from '@storybook/react';

import {
  Avatar,
  Button,
  Box,
  grommet,
  Grommet,
  Nav,
  Sidebar,
  Stack,
} from 'grommet';

import {
  Analytics,
  Calculator,
  Gremlin,
  Notification,
  Stakeholder,
} from 'grommet-icons';

import { Tip } from '../../Tip';
import { deepMerge } from '../../../../utils';
import { ThemeType } from 'grommet/themes';

const src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';

// Type annotations can only be used in TypeScript files.
// Remove ': ThemeType' if you are not using Typescript.
const customTip: ThemeType = deepMerge(grommet, {
  tip: {
    content: {
      animation: 'slideRight',
      margin: 'xsmall',
      pad: 'small',
      background: { color: 'accent-1', opacity: 0.9 },
      round: { size: 'medium', corner: 'right' },
      shimi: true,
    },
  },
});

const NotificationAlert = () => {
  return (
    <Box alignSelf="center">
      <Tip content={<Box animation="jiggle">New Analytics!</Box>}>
        <Button
          icon={
            <Stack anchor="top-right">
              <Notification />
              <Box
                background="accent-1"
                pad="xsmall"
                round
                responsive={false}
              />
            </Stack>
          }
        />
      </Tip>
    </Box>
  );
};

const SidebarHeader = () => (
  <Box pad="small">
    <Avatar
      background="linear-gradient(#6FFFB0 0%, #7D4CDB 100%)"
      border={{ color: 'white', size: 'small' }}
      round="medium"
    >
      <Gremlin color="white" />
    </Avatar>
  </Box>
);

const iconsMap = color => [
  <Analytics color={color} />,
  <Stakeholder color={color} />,
  <Calculator color={color} />,
];
const SidebarButton = ({ iconName, index }) => {
  const hoverColor = { color: 'accent-1', opacity: 0.9 };

  return (
    <Box fill="horizontal">
      <Tip content={<Box>{iconName}</Box>}>
        <Button hoverIndicator={hoverColor} plain>
          {({ hover }) => (
            <Box pad={{ vertical: 'small' }} align="center">
              {iconsMap(hover ? 'black' : 'white')[index]}
            </Box>
          )}
        </Button>
      </Tip>
    </Box>
  );
};

const CommonSidebar = ({ ...rest }) => (
  <Sidebar
    overflow="auto"
    background="brand"
    header={<SidebarHeader />}
    pad="none"
    {...rest}
  />
);

export const SidebarsTips = () => (
  <Grommet theme={customTip} full>
    <Box align="start">
      <CommonSidebar
        footer={
          <Box>
            <NotificationAlert />
            <Avatar margin="small" src={src} />
          </Box>
        }
      >
        <Nav>
          {['Analytics', 'Stakeholder', 'Calculator'].map((iconName, index) => (
            <SidebarButton key={iconName} iconName={iconName} index={index} />
          ))}
        </Nav>
      </CommonSidebar>
    </Box>
  </Grommet>
);

storiesOf('Tip', module).add('Sidebar', () => <SidebarsTips />, {
  chromatic: { disable: true },
});
