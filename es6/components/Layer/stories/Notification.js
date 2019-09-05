import React from 'react';
import { storiesOf } from '@storybook/react';
import { Add } from "grommet-icons/es6/icons/Add";
import { FormClose } from "grommet-icons/es6/icons/FormClose";
import { StatusGood } from "grommet-icons/es6/icons/StatusGood";
import { Box, Button, Grommet, Layer, Text } from 'grommet';
import { grommet } from 'grommet/themes';

var NotificationLayer = function NotificationLayer() {
  var _React$useState = React.useState(),
      open = _React$useState[0],
      setOpen = _React$useState[1];

  var onOpen = function onOpen() {
    return setOpen(true);
  };

  var onClose = function onClose() {
    return setOpen(undefined);
  };

  return React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "center"
  }, React.createElement(Button, {
    icon: React.createElement(Add, {
      color: "brand"
    }),
    label: React.createElement(Text, null, React.createElement("strong", null, "Add")),
    onClick: onOpen,
    plain: true
  })), open && React.createElement(Layer, {
    position: "bottom",
    modal: false,
    margin: {
      vertical: 'medium',
      horizontal: 'small'
    },
    onEsc: onClose,
    responsive: false,
    plain: true
  }, React.createElement(Box, {
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
  }, React.createElement(Box, {
    align: "center",
    direction: "row",
    gap: "xsmall"
  }, React.createElement(StatusGood, null), React.createElement(Text, null, "A new virtual machine has been successfully added")), React.createElement(Button, {
    icon: React.createElement(FormClose, null),
    onClick: onClose,
    plain: true
  }))));
};

storiesOf('Layer', module).add('Notification', function () {
  return React.createElement(NotificationLayer, null);
});