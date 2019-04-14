import React, { Component } from "react";

import { Box, Text } from "grommet";
import RoutedButton from "./RoutedButton";

export class MenuButton extends Component {
  render() {
    const { label, ...rest } = this.props;
    return (
      <RoutedButton hoverIndicator="light-4" {...rest}>
        <Box pad="small" gap="xsmall" justify="center">
          <Text>{label}</Text>
        </Box>
      </RoutedButton>
    );
  }
}
