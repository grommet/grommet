import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Apps, Terminal, Desktop, User } from 'grommet-icons';
import { Box, Button, CheckBox, Grommet, Stack, Text } from 'grommet';
import { hpe } from 'grommet-theme-hpe';
import { deepMerge } from 'grommet/utils';

const customTheme = deepMerge(hpe, {
  global: {
    active: {
      color: 'brand',
      background: 'text',
    },
  },
  button: {
    normalized: {
      color: '#CCC',
    },
  },
});

const data = [
  {
    label: 'Apps',
    icon: <Apps />,
  },
  {
    label: 'Console',
    icon: <Terminal />,
  },
  {
    label: 'Controls',
    icon: <Desktop />,
  },
  {
    label: 'Users',
    icon: <User />,
  },
];

const Avatar = () => (
  <Box
    height="xxsmall"
    width="xxsmall"
    round="full"
    // eslint-disable-next-line max-len
    background="url(//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80)"
  />
);

const Status = ({ theme }) => (
  <Box
    height="16px"
    width="16px"
    round="full"
    background="yellow!"
    border={{
      color: theme !== 'custom' ? 'blue!' : 'background-back',
      size: 'small',
    }}
  />
);

const SidebarButton = ({ expanded, label, ...rest }) => (
  <Button label={expanded && label} gap="medium" {...rest} normalized />
);

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <Box direction="row">
      <Grommet theme={customTheme}>
        <Box align="start" direction="row" flex={false} gap="medium" fill>
          <Box
            fill="vertical"
            background="background-back"
            pad="small"
            gap="small"
          >
            <Box direction="row" align="center" gap="small">
              <Stack anchor="bottom-right">
                <Avatar />
                {!expanded && <Status theme="custom" />}
              </Stack>
              {expanded && (
                <Box direction="row" gap="xsmall" align="center">
                  <Status theme="custom" />
                  <Text weight="bold" size="small">
                    Shimrit Yacobi
                  </Text>
                </Box>
              )}
            </Box>
            {data.map((item, index) => (
              <SidebarButton
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                active={index === 2}
                expanded={expanded}
                icon={item.icon}
                label={item.label}
              />
            ))}
          </Box>
        </Box>
        <Box pad="small">
          <CheckBox
            label="Expand Sidebars"
            onClick={() => setExpanded(!expanded)}
            toggle
          />
        </Box>
      </Grommet>
      <Grommet theme={hpe}>
        <Box align="start" direction="row" flex={false} gap="medium" fill>
          <Box fill="vertical" background="blue!" pad="small" gap="small">
            <Box direction="row" align="center" gap="small">
              <Stack anchor="bottom-right">
                <Avatar />
                {!expanded && <Status />}
              </Stack>
              {expanded && (
                <Box direction="row" gap="xsmall" align="center">
                  <Status />
                  <Text weight="bold" size="small">
                    Shimrit Yacobi
                  </Text>
                </Box>
              )}
            </Box>
            {data.map((item, index) => (
              <SidebarButton
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                active={index === 2}
                expanded={expanded}
                icon={item.icon}
                label={item.label}
              />
            ))}
          </Box>
        </Box>
      </Grommet>
    </Box>
  );
};

storiesOf('Button', module).add('Sidebar', () => <Sidebar />);
