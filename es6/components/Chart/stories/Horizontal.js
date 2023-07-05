import React from 'react';
import { Box, Chart } from 'grommet';
var gradient = [{
  value: 0,
  color: 'status-ok'
}, {
  value: 25,
  color: 'status-ok'
}, {
  value: 27,
  color: 'status-warning'
}, {
  value: 30,
  color: 'status-critical'
}];
export var Horizontal = function Horizontal() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    React.createElement(Box, {
      align: "center",
      pad: "large",
      gap: "large"
    }, ['bar', 'line', 'area', 'point'].map(function (type) {
      return /*#__PURE__*/React.createElement(Box, {
        key: type,
        direction: "row",
        gap: "medium"
      }, ['vertical', 'horizontal'].map(function (direction) {
        return /*#__PURE__*/React.createElement(Box, {
          key: direction,
          border: true
        }, /*#__PURE__*/React.createElement(Chart, {
          type: type,
          direction: direction,
          size: "small",
          values: [[10, 20], [20, 30], [30, 15]]
        }));
      }));
    }), /*#__PURE__*/React.createElement(Box, {
      direction: "row",
      gap: "medium"
    }, ['vertical', 'horizontal'].map(function (direction) {
      return /*#__PURE__*/React.createElement(Box, {
        key: direction,
        border: true
      }, /*#__PURE__*/React.createElement(Chart, {
        id: direction,
        type: "line",
        direction: direction,
        color: gradient,
        values: [20, 30, 15],
        size: "small"
      }));
    })))
    // </Grommet>
  );
};

export default {
  title: 'Visualizations/Chart/Horizontal'
};