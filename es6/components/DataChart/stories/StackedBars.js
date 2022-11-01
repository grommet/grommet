import React from 'react';
import { Box, DataChart, Text } from 'grommet';
var data = [];
for (var i = 0; i < 7; i += 1) {
  data.push({
    date: "2020-07-" + (i % 31 + 1).toString().padStart(2, 0),
    usage: Math.floor(Math.abs(Math.sin(i / 2.0) * 100)),
    forecast: Math.floor(Math.abs(Math.cos(i / 2.0) * 100))
  });
}
export var StackedBars = function StackedBars() {
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
      }, 'usage', 'forecast'],
      chart: [{
        property: [{
          property: 'usage',
          thickness: 'medium'
        }, {
          property: 'forecast',
          thickness: 'medium',
          opacity: 'medium'
        }],
        type: 'bars'
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

StackedBars.storyName = 'Stacked bars';
export default {
  title: 'Visualizations/DataChart/Stacked bars'
};