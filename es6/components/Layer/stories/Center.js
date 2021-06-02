import React from 'react';
import { Trash } from "grommet-icons/es6/icons/Trash";
import { Box, Button, Grommet, Heading, Layer, Select, Text } from 'grommet';
import { grommet } from 'grommet/themes';
export var CenterLayer = function CenterLayer() {
  var _React$useState = React.useState(),
      open = _React$useState[0],
      setOpen = _React$useState[1];

  var _React$useState2 = React.useState(),
      open2 = _React$useState2[0],
      setOpen2 = _React$useState2[1];

  var onOpen = function onOpen() {
    return setOpen(true);
  };

  var onClose = function onClose() {
    return setOpen(undefined);
  };

  var onOpen2 = function onOpen2() {
    return setOpen2(true);
  };

  var onClose2 = function onClose2() {
    return setOpen2(undefined);
  };

  return /*#__PURE__*/React.createElement(Grommet, {
    options: {
      layer: {
        singleId: true
      }
    },
    theme: grommet,
    full: true
  }, /*#__PURE__*/React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "center"
  }, /*#__PURE__*/React.createElement(Button, {
    icon: /*#__PURE__*/React.createElement(Trash, null),
    label: /*#__PURE__*/React.createElement(Text, null, /*#__PURE__*/React.createElement("strong", null, "Remove")),
    onClick: onOpen,
    plain: true
  })), open && /*#__PURE__*/React.createElement(Layer, {
    id: "hello world",
    position: "center",
    onClickOutside: onClose,
    onEsc: onClose
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "medium",
    gap: "small",
    width: "medium"
  }, /*#__PURE__*/React.createElement(Heading, {
    level: 3,
    margin: "none"
  }, "Confirm"), /*#__PURE__*/React.createElement(Text, null, "Are you sure you want to delete?"), /*#__PURE__*/React.createElement(Box, {
    as: "footer",
    gap: "small",
    direction: "row",
    align: "center",
    justify: "end",
    pad: {
      top: 'medium',
      bottom: 'small'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    label: "Open 2",
    onClick: onOpen2,
    color: "dark-3"
  }), /*#__PURE__*/React.createElement(Button, {
    label: /*#__PURE__*/React.createElement(Text, {
      color: "white"
    }, /*#__PURE__*/React.createElement("strong", null, "Delete")),
    onClick: onClose,
    primary: true,
    color: "status-critical"
  })))), open2 && /*#__PURE__*/React.createElement(Layer, {
    position: "top",
    onClickOutside: onClose2,
    onEsc: onClose2
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "medium",
    gap: "small",
    width: "medium"
  }, /*#__PURE__*/React.createElement(Heading, {
    level: 3,
    margin: "none"
  }, "Confirm 2"), /*#__PURE__*/React.createElement(Select, {
    options: ['one', 'two', 'three']
  }), /*#__PURE__*/React.createElement(Box, {
    as: "footer",
    gap: "small",
    direction: "row",
    align: "center",
    justify: "end",
    pad: {
      top: 'medium',
      bottom: 'small'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    label: "Close",
    onClick: onClose2,
    color: "dark-3"
  })))));
};
CenterLayer.storyName = 'Center';
CenterLayer.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Layout/Layer/Center'
};