import React from 'react';
import { Notification } from "grommet-icons/es6/icons/Notification";
import { Box, Button, Collapsible, Heading, Grommet, Text } from 'grommet';
import { grommet } from 'grommet/themes';
export var Horizontal = function Horizontal() {
  var _React$useState = React.useState(),
      openNotification = _React$useState[0],
      setOpenNotification = _React$useState[1];

  return /*#__PURE__*/React.createElement(Grommet, {
    full: true,
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    fill: true
  }, /*#__PURE__*/React.createElement(Box, {
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
  }, /*#__PURE__*/React.createElement(Heading, {
    level: 3,
    margin: "none",
    color: "white"
  }, /*#__PURE__*/React.createElement("strong", null, "My App")), /*#__PURE__*/React.createElement(Button, {
    onClick: function onClick() {
      return setOpenNotification(!openNotification);
    },
    icon: /*#__PURE__*/React.createElement(Notification, {
      color: "white"
    })
  })), /*#__PURE__*/React.createElement(Box, {
    flex: true,
    direction: "row"
  }, /*#__PURE__*/React.createElement(Box, {
    flex: true,
    align: "center",
    justify: "center"
  }, "Dashboard content goes here, click on the notification icon"), /*#__PURE__*/React.createElement(Collapsible, {
    direction: "horizontal",
    open: openNotification
  }, /*#__PURE__*/React.createElement(Box, {
    flex: true,
    width: "medium",
    background: "light-2",
    pad: "small",
    elevation: "small"
  }, /*#__PURE__*/React.createElement(Text, {
    size: "xlarge"
  }, "Sidebar"))))));
};
Horizontal.story = {
  parameters: {
    chromatic: {
      disable: true
    }
  }
};