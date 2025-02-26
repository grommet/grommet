import React from 'react';
import { Add } from "grommet-icons/es6/icons/Add";
import { Box, Button, Text } from 'grommet';
export var Active = function Active() {
  return /*#__PURE__*/React.createElement(Box, {
    pad: "large",
    gap: "large"
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
  }, /*#__PURE__*/React.createElement(Add, null), /*#__PURE__*/React.createElement(Text, null, "Add")))));
};
export default {
  title: 'Controls/Button/Active'
};