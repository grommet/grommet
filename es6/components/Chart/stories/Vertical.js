import React from 'react';
import { Box, Chart } from 'grommet';
export var Vertical = function Vertical() {
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
      }, ['horizontal', 'vertical'].map(function (direction) {
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
    }))
    // </Grommet>
  );
};

export default {
  title: 'Visualizations/Chart/Vertical'
};