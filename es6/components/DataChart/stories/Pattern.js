import React from 'react';
import { Box, DataChart } from 'grommet';
var data = [];
for (var i = 1; i < 8; i += 1) {
  var v = Math.sin(i / 2.0);
  data.push({
    percent: Math.abs(v * 100)
  });
}
export var Pattern = function Pattern() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    React.createElement(Box, {
      align: "center",
      justify: "start",
      pad: "large"
    }, /*#__PURE__*/React.createElement(DataChart, {
      data: data,
      series: "percent",
      chart: [{
        property: 'percent',
        type: 'area',
        thickness: 'xsmall',
        color: 'graph-0',
        opacity: 'strong',
        pattern: 'squares'
      }]
    }))
    // </Grommet>
  );
};

export default {
  title: 'Visualizations/DataChart/Pattern'
};