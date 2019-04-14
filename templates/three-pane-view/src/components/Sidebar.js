import React, { Component } from "react";

import { Box, Button, Layer, ResponsiveContext } from "grommet";
import { FormClose } from "grommet-icons";

import { MenuButton } from "./";

export class Sidebar extends Component {
  static contextType = ResponsiveContext;
  render() {
    const { items = [], onToggleSidebar, ...rest } = this.props;
    const size = this.context;
    const SidebarComponent = size === "small" ? Layer : Box;
    const sidebarProps =
      size === "small"
        ? { full: true }
        : {
            fill: "vertical",
            width: "small",
            background: "light-2",
            elevation: "xsmall"
          };
    return (
      <SidebarComponent {...sidebarProps} {...rest}>
        {size === "small" && (
          <Box align="end">
            <Button icon={<FormClose />} onClick={onToggleSidebar} />
          </Box>
        )}
        {items.map(({ active, exact, label, path }) => (
          <MenuButton
            active={active}
            exact={exact}
            path={path}
            label={label}
            key={label}
          />
        ))}
      </SidebarComponent>
    );
  }
}
