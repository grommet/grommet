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
    container: {
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
  const ref = useRef();
  // Type annotations can only be used in TypeScript files.
  // Remove '<boolean>' if you are not using Typescript.
  const [over, setOver] = useState<boolean>(false);
  return (
    <Box alignSelf="center">
      <Button
        onFocus={() => setOver(true)}
        onBlur={() => setOver(false)}
        onMouseOver={() => setOver(true)}
        onMouseOut={() => setOver(false)}
        icon={
          <Stack anchor="top-right">
            <Notification />
            <Box background="accent-1" pad="xsmall" round responsive={false} />
          </Stack>
        }
        ref={ref}
      />
      {ref.current && over && (
        <Tip target={ref.current}>
          <Box animation="jiggle">New Analytics!</Box>
        </Tip>
      )}
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
const SidebarButton = ({ tipAlign = undefined, iconName, index }) => {
  // Type annotations can only be used in TypeScript files.
  // Remove '<boolean>' if you are not using Typescript.
  const [over, setOver] = useState<boolean>(false);
  const tooltipColor = { color: 'accent-1', opacity: 0.9 };
  const tipProps = tipAlign ? { align: tipAlign } : undefined;
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
        <Tip target={ref.current} {...tipProps}>
          <Box>{iconName}</Box>
        </Tip>
      )}
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

export const SidebarsTips = () => {
  const icons = ['Analytics', 'Stakeholder', 'Calculator'];

  return (
    <Grommet theme={customTip} full>
      <Box direction="row" height={{ min: '100%' }} justify="between">
        {/* Left Sidebar */}
        <CommonSidebar
          footer={
            <Box>
              <NotificationAlert />
              <Avatar margin="small" src={src} />
            </Box>
          }
        >
          <Nav>
            {icons.map((iconName, index) => (
              <SidebarButton key={iconName} iconName={iconName} index={index} />
            ))}
          </Nav>
        </CommonSidebar>
        {/* Right Sidebar */}
        <CommonSidebar footer={<Avatar margin="small" src={src} />}>
          <Nav>
            {icons.map((iconName, index) => (
              <SidebarButton
                key={iconName}
                iconName={iconName}
                index={index}
                tipAlign={{ right: 'left' }}
              />
            ))}
          </Nav>
        </CommonSidebar>
      </Box>
    </Grommet>
  );
};

storiesOf('Tip', module).add('Themed', () => <SidebarsTips />, {
  chromatic: { disable: true },
});
