import React from 'react';
import { Box, DataChart } from 'grommet';
var data = [];
for (var i = 1; i < 3; i += 1) {
  var v = Math.sin(i / 2.0);
  data.push({
    percent: Math.abs(v * 100)
  });
}
export var Pad = function Pad() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    React.createElement(Box, {
      align: "center",
      justify: "start",
      pad: "large"
    }, /*#__PURE__*/React.createElement(DataChart, {
      bounds: {
        y: [0, 100]
      },
      guide: true,
      detail: true,
      pad: {
        horizontal: 'xlarge'
      },
      data: data,
      series: ['percent', {}],
      chart: [{
        property: 'percent',
        thickness: 'medium'
      }]
    }))
    // </Grommet>
  );
};

export default {
  title: 'Visualizations/DataChart/Pad'
};