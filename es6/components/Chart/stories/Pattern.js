import React from 'react';
import { Box, Chart } from 'grommet';
export var Pattern = function Pattern() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    React.createElement(Box, {
      align: "center",
      pad: "large",
      gap: "medium"
    }, ['squares', 'circles', 'stripesHorizontal', 'stripesVertical', 'stripesDiagonalDown', 'stripesDiagonalUp'].map(function (pattern) {
      return /*#__PURE__*/React.createElement(Chart, {
        key: pattern,
        id: "area-" + pattern,
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
    }))
    // </Grommet>
  );
};

export default {
  title: 'Visualizations/Chart/Pattern'
};