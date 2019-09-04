import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { matchPath } from 'react-router-dom';

import { Box, Text } from 'grommet';

import RoutedButton from './RoutedButton';
import { MenuButton, UserMenu } from './';

export class Sidebar extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  render() {
    const { appIcon, appName, items = [], userSession, ...rest } = this.props;
    const { router } = this.context;
    return (
      <Box
        fill="vertical"
        width="sidebar"
        background="dark-2"
        elevation="medium"
        {...rest}
      >
        <RoutedButton
          path="/"
          hoverIndicator="dark-4"
          active={
            !!matchPath(router.route.location.pathname, {
              path: '/',
              exact: true,
            })
          }
        >
          <Box
            flex={false}
            align="center"
            gap="xsmall"
            pad={{ vertical: 'small' }}
          >
            {appIcon}
            <Text size="xsmall">{appName}</Text>
          </Box>
        </RoutedButton>
        <Box flex overflow="auto">
          {items.map(({ active, Icon, label, path }) => (
            <MenuButton
              active={active}
              Icon={Icon}
              path={path}
              label={label}
              key={label}
            />
          ))}
        </Box>
        {userSession && (
          <UserMenu
            alignSelf="center"
            user={userSession.user}
            items={userSession.items}
          />
        )}
      </Box>
    );
  }
}
