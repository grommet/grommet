import React from 'react';
import { Grommet, Box, Chart } from 'grommet';
import { grommet } from 'grommet/themes';
export var Dash = function Dash() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large",
    gap: "large"
  }, /*#__PURE__*/React.createElement(Chart, {
    type: "line",
    dash: true,
    values: [20, 30, 15]
  }), /*#__PURE__*/React.createElement(Chart, {
    type: "line",
    dash: true,
    round: true,
    values: [20, 30, 15]
  }), /*#__PURE__*/React.createElement(Chart, {
    type: "line",
    dash: true,
    thickness: "xsmall",
    values: [20, 30, 15]
  }), /*#__PURE__*/React.createElement(Chart, {
    type: "line",
    dash: true,
    round: true,
    thickness: "xsmall",
    values: [20, 30, 15]
  }), /*#__PURE__*/React.createElement(Chart, {
    type: "bar",
    dash: true,
    values: [[10, 20], [20, 30], [30, 15]]
  })));
};