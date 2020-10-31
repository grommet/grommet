import React from 'react';
import { Grommet, Box } from 'grommet';
import { grommet } from '../../../themes';
export var RTLBox = function RTLBox() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet,
    dir: "rtl"
  }, /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    align: "center",
    pad: "small",
    gap: "small",
    border: true
  }, /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    align: "center",
    pad: "small",
    border: "start"
  }, "border start"), /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    align: "center",
    pad: {
      start: 'large'
    },
    background: "brand"
  }, "pad start"), /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    align: "center",
    margin: {
      start: 'large'
    },
    background: "brand"
  }, "margin start")));
};
RTLBox.story = {
  name: 'RTL'
};