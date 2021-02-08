import React from 'react';
import { Add } from "grommet-icons/es6/icons/Add";
import { FormClose } from "grommet-icons/es6/icons/FormClose";
import { StatusGood } from "grommet-icons/es6/icons/StatusGood";
import { Box, Button, Grommet, Layer, Text } from 'grommet';
import { grommet } from 'grommet/themes';
export var NotificationLayer = function NotificationLayer() {
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
    icon: /*#__PURE__*/React.createElement(Add, {
      color: "brand"
    }),
    label: /*#__PURE__*/React.createElement(Text, null, /*#__PURE__*/React.createElement("strong", null, "Add")),
    onClick: onOpen,
    plain: true
  })), open && /*#__PURE__*/React.createElement(Layer, {
    position: "bottom",
    modal: false,
    margin: {
      vertical: 'medium',
      horizontal: 'small'
    },
    onEsc: onClose,
    responsive: false,
    plain: true
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    direction: "row",
    gap: "small",
    justify: "between",
    round: "medium",
    elevation: "medium",
    pad: {
      vertical: 'xsmall',
      horizontal: 'small'
    },
    background: "status-ok"
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    direction: "row",
    gap: "xsmall"
  }, /*#__PURE__*/React.createElement(StatusGood, null), /*#__PURE__*/React.createElement(Text, null, "A new virtual machine has been successfully added (this Layer will close after 3 seconds)")), /*#__PURE__*/React.createElement(Button, {
    icon: /*#__PURE__*/React.createElement(FormClose, null),
    onClick: onClose,
    plain: true
  }))));
};
NotificationLayer.storyName = 'Notification';
NotificationLayer.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Layout/Layer/Notification'
};