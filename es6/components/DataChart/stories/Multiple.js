import React from 'react';
import { storiesOf } from '@storybook/react';
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

var MultipleDataChart = function MultipleDataChart() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/React.createElement(DataChart, {
    data: data,
    chart: [{
      key: 'amount',
      type: 'area',
      thickness: 'xsmall',
      color: {
        color: 'graph-0',
        opacity: 'medium'
      }
    }, {
      key: 'amount',
      type: 'line',
      thickness: 'xsmall',
      round: true
    }, {
      key: 'amount',
      type: 'bar',
      thickness: 'hair'
    }, {
      key: 'amount',
      type: 'point',
      round: true,
      thickness: 'medium'
    }],
    xAxis: {
      labels: 2,
      key: 'date',
      render: function render(date) {
        return /*#__PURE__*/React.createElement(Box, {
          pad: "xsmall",
          align: "start"
        }, /*#__PURE__*/React.createElement(Text, null, new Date(date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric'
        })));
      }
    },
    yAxis: {
      guide: true,
      labels: 3
    },
    gap: "medium",
    pad: "small"
  })));
};

storiesOf('DataChart', module).add('Multiple', function () {
  return /*#__PURE__*/React.createElement(MultipleDataChart, null);
});