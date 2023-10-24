import React from 'react';
import { Add } from "grommet-icons/es6/icons/Add";
import { Box, Button, Layer, Text } from 'grommet';
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
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Box, {
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
    }, "Corner top-right position"))))
    // </Grommet>
  );
};

CornerLayer.storyName = 'Corner';
CornerLayer.parameters = {
  chromatic: {
    disable: true
  }
};
CornerLayer.args = {
  full: true
};
export default {
  title: 'Layout/Layer/Corner'
};