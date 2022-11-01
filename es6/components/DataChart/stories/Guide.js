import React from 'react';
import { Box, DataChart } from 'grommet';
var data = [];
for (var i = 1; i < 8; i += 1) {
  var v = Math.sin(i / 2.0);
  data.push({
    date: "2020-" + (i % 12 + 1).toString().padStart(2, 0) + "-01",
    percent: Math.round(Math.abs(v * 100))
  });
}
export var Guide = function Guide() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet} full>
    React.createElement(Box, {
      fill: true
    }, /*#__PURE__*/React.createElement(Box, {
      pad: "large",
      width: {
        min: 'small',
        max: 'large'
      }
    }, /*#__PURE__*/React.createElement(DataChart, {
      data: data,
      series: ['date', 'percent'],
      chart: [{
        property: 'percent',
        thickness: 'xsmall',
        type: 'line'
      }, {
        property: 'percent',
        thickness: 'medium',
        type: 'point',
        point: 'diamond'
      }],
      guide: {
        x: {
          granularity: 'fine'
        },
        y: {
          granularity: 'medium'
        }
      },
      size: {
        width: 'fill'
      },
      detail: true
    })))
    // </Grommet>
  );
};

export default {
  title: 'Visualizations/DataChart/Guide'
};