import React from 'react';
import { Box, Button, Grommet } from 'grommet';
import { Next } from "grommet-icons/es6/icons/Next";
import { Add } from "grommet-icons/es6/icons/Add";
import { grommet } from 'grommet/themes';
export var Sizes = function Sizes() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    direction: "row"
  }, /*#__PURE__*/React.createElement(Box, {
    align: "start",
    pad: "large",
    gap: "large"
  }, /*#__PURE__*/React.createElement(Button, {
    size: "small",
    label: "Small"
  }), /*#__PURE__*/React.createElement(Button, {
    size: "medium",
    label: "Medium"
  }), /*#__PURE__*/React.createElement(Button, {
    label: "Default"
  }), /*#__PURE__*/React.createElement(Button, {
    size: "large",
    label: "Large"
  })), /*#__PURE__*/React.createElement(Box, {
    align: "start",
    pad: "large",
    gap: "large"
  }, /*#__PURE__*/React.createElement(Button, {
    primary: true,
    size: "small",
    label: "Small"
  }), /*#__PURE__*/React.createElement(Button, {
    primary: true,
    size: "medium",
    label: "Medium"
  }), /*#__PURE__*/React.createElement(Button, {
    primary: true,
    label: "Default"
  }), /*#__PURE__*/React.createElement(Button, {
    primary: true,
    size: "large",
    label: "Large"
  })), /*#__PURE__*/React.createElement(Box, {
    align: "start",
    pad: "large",
    gap: "large"
  }, /*#__PURE__*/React.createElement(Button, {
    size: "small",
    label: "Small",
    icon: /*#__PURE__*/React.createElement(Next, null),
    reverse: true
  }), /*#__PURE__*/React.createElement(Button, {
    size: "medium",
    label: "Medium",
    icon: /*#__PURE__*/React.createElement(Next, null),
    reverse: true
  }), /*#__PURE__*/React.createElement(Button, {
    label: "Default",
    icon: /*#__PURE__*/React.createElement(Next, null),
    reverse: true
  }), /*#__PURE__*/React.createElement(Button, {
    size: "large",
    label: "Large",
    icon: /*#__PURE__*/React.createElement(Next, null),
    reverse: true
  })), /*#__PURE__*/React.createElement(Box, {
    align: "start",
    pad: "large",
    gap: "large"
  }, /*#__PURE__*/React.createElement(Button, {
    size: "small",
    icon: /*#__PURE__*/React.createElement(Add, null),
    primary: true
  }), /*#__PURE__*/React.createElement(Button, {
    size: "medium",
    icon: /*#__PURE__*/React.createElement(Add, null),
    primary: true
  }), /*#__PURE__*/React.createElement(Button, {
    icon: /*#__PURE__*/React.createElement(Add, null),
    primary: true
  }), /*#__PURE__*/React.createElement(Button, {
    size: "large",
    icon: /*#__PURE__*/React.createElement(Add, null),
    primary: true
  }))));
};