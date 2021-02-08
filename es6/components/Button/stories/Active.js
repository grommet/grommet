import React from 'react';
import { Add } from "grommet-icons/es6/icons/Add";
import { Box, Button, Grommet, Text } from 'grommet';
import { grommet } from 'grommet/themes';
export var Active = function Active() {
  return /*#__PURE__*/React.createElement(Box, {
    pad: "large",
    gap: "large"
  }, /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center"
  }, /*#__PURE__*/React.createElement(Button, {
    hoverIndicator: "light-1",
    onClick: function onClick() {},
    active: true
  }, /*#__PURE__*/React.createElement(Box, {
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
  }, /*#__PURE__*/React.createElement(Button, {
    hoverIndicator: "light-1",
    onClick: function onClick() {},
    active: true
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "small",
    direction: "row",
    align: "center",
    gap: "small"
  }, /*#__PURE__*/React.createElement(Add, null), /*#__PURE__*/React.createElement(Text, null, "Kind"))))));
};
export default {
  title: 'Controls/Button/Active'
};