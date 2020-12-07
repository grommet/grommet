import React from 'react';
import { FormClose } from "grommet-icons/es6/icons/FormClose";
import { Box, Button, Grommet, Layer, Text } from 'grommet';
import { grommet } from 'grommet/themes';
export var Timeout = function Timeout() {
  var _React$useState = React.useState(),
      open = _React$useState[0],
      setOpen = _React$useState[1];

  var onOpen = function onOpen() {
    setOpen(true);
    setTimeout(function () {
      setOpen(undefined);
    }, 3000);
  };

  var onClose = function onClose() {
    return setOpen(undefined);
  };

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, /*#__PURE__*/React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "center"
  }, /*#__PURE__*/React.createElement(Button, {
    label: "Show Layer",
    onClick: onOpen
  })), open && /*#__PURE__*/React.createElement(Layer, {
    position: "top",
    modal: false,
    margin: {
      vertical: 'medium',
      horizontal: 'small'
    },
    onEsc: onClose,
    responsive: false
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    direction: "row",
    round: "medium",
    elevation: "medium",
    pad: {
      vertical: 'xsmall',
      horizontal: 'small'
    },
    background: "light-3"
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    direction: "row",
    gap: "xsmall"
  }, /*#__PURE__*/React.createElement(Text, null, "This Layer will disappear after 3 seconds")), /*#__PURE__*/React.createElement(Button, {
    icon: /*#__PURE__*/React.createElement(FormClose, null),
    onClick: onClose,
    plain: true
  }))));
};
Timeout.story = {
  parameters: {
    chromatic: {
      disable: true
    }
  }
};