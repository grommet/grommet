import React from 'react';
import { grommet, Box, Button, Grommet, Heading, Text, Tip } from 'grommet';
import { Trash } from "grommet-icons/es6/icons/Trash";

var TipContent = function TipContent(_ref) {
  var message = _ref.message;
  return /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    align: "center"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 22 22",
    version: "1.1",
    width: "22px",
    height: "22px"
  }, /*#__PURE__*/React.createElement("polygon", {
    fill: "grey",
    points: "6 2 18 12 6 22",
    transform: "matrix(-1 0 0 1 30 0)"
  })), /*#__PURE__*/React.createElement(Box, {
    background: "grey",
    direction: "row",
    pad: "small",
    round: "xsmall"
  }, /*#__PURE__*/React.createElement(Text, {
    color: "accent-1"
  }, message)));
};

export var Caret = function Caret() {
  return /*#__PURE__*/React.createElement(Grommet, {
    full: true,
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    justify: "center",
    background: "dark-1",
    fill: true,
    gap: "large"
  }, /*#__PURE__*/React.createElement(Heading, {
    textAlign: "center",
    level: "1",
    size: "xsmall"
  }, "Tooltip is styled with a Caret"), /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Box, {
    fill: true,
    direction: "row",
    justify: "between"
  }, /*#__PURE__*/React.createElement(Tip, {
    dropProps: {
      align: {
        left: 'right'
      }
    },
    content: /*#__PURE__*/React.createElement(TipContent, {
      message: "Designed with an SVG of Caret"
    }),
    plain: true
  }, /*#__PURE__*/React.createElement(Button, {
    icon: /*#__PURE__*/React.createElement(Trash, null),
    plain: false
  }))))));
};
Caret.story = {
  parameters: {
    chromatic: {
      disable: true
    }
  }
};