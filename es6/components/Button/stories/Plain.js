function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Add } from "grommet-icons/es6/icons/Add";
import { Box, Button, Grommet, Text } from 'grommet';
import { grommet } from 'grommet/themes';

var PlainButtons = function PlainButtons(props) {
  return /*#__PURE__*/React.createElement(Box, {
    pad: "large",
    gap: "large"
  }, /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center"
  }, /*#__PURE__*/React.createElement(Button, _extends({
    hoverIndicator: "light-1",
    onClick: function onClick() {}
  }, props), /*#__PURE__*/React.createElement(Box, {
    pad: "small",
    direction: "row",
    align: "center",
    gap: "small"
  }, /*#__PURE__*/React.createElement(Add, null), /*#__PURE__*/React.createElement(Text, null, "Add"))))), /*#__PURE__*/React.createElement(Grommet, {
    theme: {
      global: {
        font: {
          family: "-apple-system, BlinkMacSystemFont"
        }
      },
      button: {
        "default": {}
      } // enabling kind button functionality

    }
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center"
  }, /*#__PURE__*/React.createElement(Button, _extends({
    hoverIndicator: "light-1",
    onClick: function onClick() {}
  }, props), /*#__PURE__*/React.createElement(Box, {
    pad: "small",
    direction: "row",
    align: "center",
    gap: "small"
  }, /*#__PURE__*/React.createElement(Add, null), /*#__PURE__*/React.createElement(Text, null, "Kind"))))));
};

export var Plain = function Plain() {
  return /*#__PURE__*/React.createElement(PlainButtons, null);
};
export var Active = function Active() {
  return /*#__PURE__*/React.createElement(PlainButtons, {
    active: true
  });
};