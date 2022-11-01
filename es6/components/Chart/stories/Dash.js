import React from 'react';
import { Box, Chart } from 'grommet';
export var Dash = function Dash() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    React.createElement(Box, {
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
    }))
    // </Grommet>
  );
};

export default {
  title: 'Visualizations/Chart/Dash'
};