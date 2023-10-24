import React from 'react';
import { Box, DataChart } from 'grommet';
var data = [];
for (var i = 1; i < 8; i += 1) {
  var v = Math.sin(i / 2.0);
  data.push({
    percent: Math.abs(v * 100),
    label: "Label " + i
  });
}
export var Horizontal = function Horizontal() {
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
      series: [{
        property: 'label',
        render: function render(label) {
          return label;
        }
      }, {
        property: 'percent',
        suffix: '%'
      }],
      direction: "horizontal",
      size: "medium",
      axis: {
        x: {
          granularity: 'fine'
        },
        y: {
          property: 'label',
          granularity: 'fine'
        }
      },
      guide: {
        x: {
          granularity: 'fine'
        },
        y: {
          granularity: 'fine'
        }
      }
    }))
    // </Grommet>
  );
};

export default {
  title: 'Visualizations/DataChart/Horizontal'
};