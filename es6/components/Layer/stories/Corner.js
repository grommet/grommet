import React from 'react';
import { Add } from "grommet-icons/es6/icons/Add";
import { Box, Button, Grommet, Layer, Text } from 'grommet';
import { grommet } from 'grommet/themes';
export var CornerLayer = function CornerLayer() {
  var _React$useState = React.useState(),
      open = _React$useState[0],
      setOpen = _React$useState[1];

  var onOpen = function onOpen() {
    return setOpen(true);
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
    label: /*#__PURE__*/React.createElement(Text, null, /*#__PURE__*/React.createElement("strong", null, "Add Corner Layer")),
    onClick: onOpen,
    plain: true
  })), open && /*#__PURE__*/React.createElement(Layer, {
    position: "top-right",
    onClickOutside: onClose
  }, /*#__PURE__*/React.createElement(Box, {
    height: "small",
    overflow: "auto"
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "xlarge"
  }, "Corner top-right position"))));
};
CornerLayer.storyName = 'Corner';
CornerLayer.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Layout/Layer/Corner'
};