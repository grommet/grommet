import React from 'react';
import { Box, DataChart, Grommet, Text } from 'grommet';
import { grommet } from 'grommet/themes';
var data = [];

for (var i = 0; i < 13; i += 1) {
  var v = -Math.sin(i / 2.0);
  data.push({
    date: "2020-07-" + (i % 30 + 1).toString().padStart(2, 0),
    amount: Math.floor(v * 100)
  });
}

export var MultipleTypes = function MultipleTypes() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/React.createElement(DataChart, {
    data: data,
    series: [{
      property: 'date',
      render: function render(date) {
        return /*#__PURE__*/React.createElement(Box, {
          pad: "xsmall",
          align: "start"
        }, /*#__PURE__*/React.createElement(Text, null, new Date(date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric'
        })));
      }
    }, 'amount'],
    chart: [{
      property: 'amount',
      type: 'area',
      thickness: 'xsmall',
      color: 'graph-0',
      opacity: 'medium'
    }, {
      property: 'amount',
      type: 'line',
      thickness: 'xsmall',
      round: true
    }, {
      property: 'amount',
      type: 'bar',
      thickness: 'hair'
    }, {
      property: 'amount',
      type: 'point',
      round: true,
      thickness: 'medium'
    }],
    axis: {
      x: 'date',
      y: {
        property: 'amount',
        granularity: 'medium'
      }
    },
    guide: {
      y: true
    },
    gap: "medium",
    pad: "small"
  })));
};
MultipleTypes.storyName = 'Multiple types';
export default {
  title: 'Visualizations/DataChart/Multiple types'
};