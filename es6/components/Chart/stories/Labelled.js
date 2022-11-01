import React from 'react';
import { Box, Chart, Text } from 'grommet';
var LabelledChart = function LabelledChart(_ref) {
  var color = _ref.color,
    label = _ref.label,
    value = _ref.value;
  return /*#__PURE__*/React.createElement(Box, {
    flex: false,
    basis: "xsmall",
    align: "center",
    gap: "small"
  }, /*#__PURE__*/React.createElement(Chart, {
    bounds: [[0, 2], [0, 400]],
    type: "bar",
    values: [{
      value: [1, value]
    }],
    color: color,
    round: true,
    size: {
      height: 'medium',
      width: 'xsmall'
    }
  }), /*#__PURE__*/React.createElement(Box, {
    align: "center"
  }, /*#__PURE__*/React.createElement(Text, null, label), /*#__PURE__*/React.createElement(Text, {
    weight: "bold"
  }, value, " TiB")));
};
export var LabelledCharts = function LabelledCharts() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    React.createElement(Box, {
      pad: "large",
      direction: "row",
      gap: "medium"
    }, /*#__PURE__*/React.createElement(LabelledChart, {
      label: "Exported",
      value: 300
    }), /*#__PURE__*/React.createElement(LabelledChart, {
      label: "Usable",
      value: 200,
      color: "graph-1"
    }), /*#__PURE__*/React.createElement(LabelledChart, {
      label: "Used",
      value: 98.2,
      color: "graph-2"
    }))
    // </Grommet>
  );
};

LabelledCharts.storyName = 'Labelled';
export default {
  title: 'Visualizations/Chart/Labelled'
};