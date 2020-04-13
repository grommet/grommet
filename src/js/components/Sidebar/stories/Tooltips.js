import React, { useRef, useState } from 'react';
import { storiesOf } from '@storybook/react';

import {
  Avatar,
  Button,
  Box,
  Drop,
  grommet,
  Grommet,
  Nav,
  Stack,
} from 'grommet';

import {
  Analytics,
  Calculator,
  Gremlin,
  Notification,
  Stakeholder,
} from 'grommet-icons';

import { Sidebar } from '../Sidebar';

const src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';

const NotificationIcon = () => (
  <Stack anchor="top-right">
    <Notification />
    <Box background="accent-1" pad="xsmall" round responsive={false} />
  </Stack>
);

const NotificationAlert = () => {
  const ref = useRef();
  const [over, setOver] = useState();
  return (
    <Box alignSelf="center">
      <Button
        onFocus={() => setOver(true)}
        onBlur={() => setOver(false)}
        onMouseOver={() => setOver(true)}
        onMouseOut={() => setOver(false)}
        icon={<NotificationIcon />}
        ref={ref}
      />
      {ref.current && over && (
        <Drop align={{ left: 'right' }} plain target={ref.current}>
          <Box
            animation="jiggle"
            background="accent-1"
            round={{ corner: 'left' }}
            pad="small"
            margin={{ vertical: 'large' }}
          >
            New Analytics!
          </Box>
        </Drop>
      )}
    </Box>
  );
};

const SidebarFooter = () => (
  <Box>
    <NotificationAlert />
    <Avatar margin="small" src={src} />
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

const iconsMap = color => [
  <Analytics color={color} />,
  <Stakeholder color={color} />,
  <Calculator color={color} />,
];
const SidebarButton = ({ iconName, index }) => {
  const [over, setOver] = useState();
  const tooltipColor = { color: 'accent-1', opacity: 0.9 };

  const ref = useRef();
  return (
    <Box fill="horizontal">
      <Button
        ref={ref}
        onMouseOver={() => setOver(true)}
        onMouseLeave={() => setOver(false)}
        onFocus={() => setOver(false)}
        onBlur={() => setOver(false)}
        hoverIndicator={tooltipColor}
        plain
      >
        {({ hover }) => (
          <Box pad={{ vertical: 'small' }} align="center">
            {iconsMap(hover ? 'black' : 'white')[index]}
          </Box>
        )}
      </Button>
      {ref.current && over && (
        <Drop align={{ left: 'right' }} target={ref.current} plain>
          <Box
            animation="slideRight"
            margin="xsmall"
            pad="small"
            background={tooltipColor}
            round={{ size: 'medium', corner: 'right' }}
          >
            {iconName}
          </Box>
        </Drop>
      )}
    </Box>
  );
};

export const TooltipsSidebar = () => (
  <Grommet theme={grommet} full>
    <Box direction="row" height={{ min: '100%' }}>
      <Sidebar
        overflow="auto"
        background="brand"
        header={<SidebarHeader />}
        footer={<SidebarFooter />}
        pad="none"
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

storiesOf('Sidebar', module).add('Tooltips', () => <TooltipsSidebar />);
