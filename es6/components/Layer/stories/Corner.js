import React from 'react';
import { storiesOf } from '@storybook/react';
import { Add } from "grommet-icons/es6/icons/Add";
import { Box, Button, Grommet, Layer, Text } from 'grommet';
import { grommet } from 'grommet/themes';

var CornerLayer = function CornerLayer() {
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
    label: React.createElement(Text, null, React.createElement("strong", null, "Add Corner Layer")),
    onClick: onOpen,
    plain: true
  })), open && React.createElement(Layer, {
    position: "top-right",
    onClickOutside: onClose
  }, React.createElement(Box, {
    height: "small",
    overflow: "auto"
  }, React.createElement(Box, {
    pad: "xlarge"
  }, "Corner top-right position"))));
};

storiesOf('Layer', module).add('Corner', function () {
  return React.createElement(CornerLayer, null);
});