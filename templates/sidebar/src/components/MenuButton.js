import React, { Component } from "react";
import PropTypes from "prop-types";
import { matchPath } from "react-router-dom";

import { Box, RoutedButton, Text } from "grommet";

export class MenuButton extends Component {
  static contextTypes = {
    router: PropTypes.object
  };
  render() {
    const { active, Icon, label, path, ...rest } = this.props;
    const { router } = this.context;
    return (
      <RoutedButton
        active={active || !!matchPath(router.route.location.pathname, { path })}
        hoverIndicator="dark-4"
        path={path}
        {...rest}
      >
        <Box
          pad={{ vertical: "small" }}
          gap="xsmall"
          align="center"
          justify="center"
        >
          <Icon color="light-5" />
          <Text size="xsmall" color="white">
            {label}
          </Text>
        </Box>
      </RoutedButton>
    );
  }
}
