import React from 'react';
import { Box, Chart, Heading } from 'grommet';
var values = [{
  value: [10, 20]
}, {
  value: [20, 30]
}, {
  value: [30, 15]
}];
export var AnimatedChart = function AnimatedChart() {
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
        animate: true
      }));
    }))
    // </Grommet>
  );
};

AnimatedChart.storyName = 'Animate';
AnimatedChart.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Visualizations/Chart/Animate'
};