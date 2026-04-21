import React from 'react';

import {
  Avatar,
  Button,
  Box,
  Grommet,
  Nav,
  Sidebar,
  Stack,
  Tip,
} from 'grommet';

import {
  Analytics,
  Calculator,
  Gremlin,
  Notification,
  Stakeholder,
} from 'grommet-icons';

const src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';

const customTheme = {
  global: {
    font: {
      family: `-apple-system, BlinkMacSystemFont`,
    },
    colors: {
      text: 'black',
    },
  },
  tip: {
    drop: {
      align: { left: 'right' },
    },
    content: {
      animation: 'slideRight',
      margin: 'small',
      pad: 'small',
      background: { color: 'accent-1', opacity: 0.9 },
      round: { size: 'medium', corner: 'right' },
      flex: false, // so Tip won't get cut on a window resize
    },
  },
};

const NotificationAlert = () => (
  <Box alignSelf="center">
    {/* One option to apply tip on button  */}
    <Button
      tip={{
        dropProps: { align: { left: 'right' } },
        content: <Box animation="jiggle">New Analytics!</Box>,
      }}
      icon={
        <Stack anchor="top-right">
          <Notification />
          <Box background="accent-1" pad="xsmall" round responsive={false} />
        </Stack>
      }
    />
  </Box>
);

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

const iconsMap = (color) => [
  <Analytics color={color} />,
  <Stakeholder color={color} />,
  <Calculator color={color} />,
];
const SidebarButton = ({ iconName, index }) => {
  const hoverColor = { color: 'accent-1', opacity: 0.9 };

  return (
    <Box fill="horizontal">
      {/* Second option to apply tip on button  */}
      <Tip
        content={<Box>{iconName}</Box>}
        dropProps={{ align: { left: 'right' } }}
      >
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

export const SidebarTip = () => (
  <Grommet theme={customTheme} full>
    <Box direction="row" height={{ min: '100%' }}>
      <Sidebar
        background="brand"
        header={<SidebarHeader />}
        pad={{ vertical: 'small' }}
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
      </Sidebar>
    </Box>
  </Grommet>
);

SidebarTip.storyName = 'Sidebar';

export default {
  title: 'Controls/Tip/Custom Themed/Sidebar',
};
