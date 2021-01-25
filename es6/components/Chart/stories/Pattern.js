import React from 'react';
import { Grommet, Box, Chart } from 'grommet';
import { grommet } from 'grommet/themes';
export var Pattern = function Pattern() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large",
    gap: "medium"
  }, ['squares', 'circles', 'stripesHorizontal', 'stripesVertical', 'stripesDiagonalDown', 'stripesDiagonalUp'].map(function (pattern) {
    return /*#__PURE__*/React.createElement(Chart, {
      id: "area",
      type: "area",
      pattern: pattern,
      thickness: "xsmall",
      values: [{
        value: [10, 20]
      }, {
        value: [20, 30]
      }, {
        value: [30, 15]
      }]
    });
  })));
};