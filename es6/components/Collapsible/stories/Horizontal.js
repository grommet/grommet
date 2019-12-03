import React from 'react';
import { storiesOf } from '@storybook/react';
import { Notification } from "grommet-icons/es6/icons/Notification";
import { Box, Button, Collapsible, Heading, Grommet, Text } from 'grommet';
import { grommet } from 'grommet/themes';

var HorizontalCollapsible = function HorizontalCollapsible() {
  var _React$useState = React.useState(),
      openNotification = _React$useState[0],
      setOpenNotification = _React$useState[1];

  return React.createElement(Grommet, {
    full: true,
    theme: grommet
  }, React.createElement(Box, {
    fill: true
  }, React.createElement(Box, {
    as: "header",
    direction: "row",
    align: "center",
    pad: {
      vertical: 'small',
      horizontal: 'medium'
    },
    justify: "between",
    background: "neutral-3",
    elevation: "large",
    style: {
      zIndex: '1000'
    }
  }, React.createElement(Heading, {
    level: 3,
    margin: "none",
    color: "white"
  }, React.createElement("strong", null, "My App")), React.createElement(Button, {
    onClick: function onClick() {
      return setOpenNotification(!openNotification);
    },
    icon: React.createElement(Notification, {
      color: "white"
    })
  })), React.createElement(Box, {
    flex: true,
    direction: "row"
  }, React.createElement(Box, {
    flex: true,
    align: "center",
    justify: "center"
  }, "Dashboard content goes here, click on the notification icon"), React.createElement(Collapsible, {
    direction: "horizontal",
    open: openNotification
  }, React.createElement(Box, {
    flex: true,
    width: "medium",
    background: "light-2",
    pad: "small",
    elevation: "small"
  }, React.createElement(Text, {
    size: "xlarge"
  }, "Sidebar"))))));
};

storiesOf('Collapsible', module).add('Horizontal', function () {
  return React.createElement(HorizontalCollapsible, null);
});