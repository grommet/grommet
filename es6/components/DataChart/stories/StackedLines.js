import React from 'react';
import { Box, DataChart, Text } from 'grommet';
var data = [];
for (var i = 0; i < 7; i += 1) {
  data.push({
    date: "2020-07-" + (i % 31 + 1).toString().padStart(2, 0),
    usage: Math.floor(Math.abs(Math.sin(i / 2.0) * 100)),
    bonus: Math.floor(Math.abs(Math.cos(i / 2.0) * 100))
  });
}
export var StackedLines = function StackedLines() {
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
        property: 'date',
        render: function render(date) {
          return /*#__PURE__*/React.createElement(Text, {
            margin: {
              horizontal: 'xsmall'
            }
          }, new Date(date).toLocaleDateString('en-US', {
            month: 'numeric',
            day: 'numeric'
          }));
        }
      }, 'usage', 'bonus'],
      chart: [{
        property: ['usage', 'bonus'],
        type: 'lines',
        thickness: 'xsmall',
        round: true
      }],
      axis: {
        x: {
          property: 'date',
          granularity: 'fine'
        },
        y: true
      },
      guide: {
        y: true
      },
      legend: true
    }))
    // </Grommet>
  );
};

StackedLines.storyName = 'Stacked lines';
export default {
  title: 'Visualizations/DataChart/Stacked lines'
};