import React from 'react';
import { Grommet, Box, Chart, Heading } from 'grommet';
import { grommet } from 'grommet/themes';
var values = [{
  value: [10, 20]
}, {
  value: [20, 30]
}, {
  value: [30, 15]
}];
export var Point = function Point() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    direction: "row-responsive",
    wrap: true,
    pad: "large"
  }, ['circle', 'square', 'diamond', 'star', 'triangle', 'triangleDown'].map(function (point) {
    return /*#__PURE__*/React.createElement(Box, {
      key: point,
      margin: "medium"
    }, /*#__PURE__*/React.createElement(Heading, {
      size: "small",
      textAlign: "center"
    }, point), /*#__PURE__*/React.createElement(Chart, {
      type: "point",
      values: values,
      point: point
    }));
  })));
};
export default {
  title: 'Visualizations/Chart/Point'
};