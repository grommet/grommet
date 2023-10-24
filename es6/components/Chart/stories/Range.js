import React from 'react';
import { Box, Chart, Heading } from 'grommet';
var values = [[10, 20, 30], [20, 30, 60], [30, 15, 20]];
export var Range = function Range() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    React.createElement(Box, {
      direction: "row-responsive",
      wrap: true,
      pad: "large"
    }, ['bar', 'line', 'area', 'point'].map(function (type) {
      return /*#__PURE__*/React.createElement(Box, {
        key: type,
        margin: "medium"
      }, /*#__PURE__*/React.createElement(Heading, {
        size: "small",
        textAlign: "center"
      }, type), /*#__PURE__*/React.createElement(Chart, {
        type: type,
        values: values,
        thickness: "small"
      }));
    }))
    // </Grommet>
  );
};

export default {
  title: 'Visualizations/Chart/Range'
};