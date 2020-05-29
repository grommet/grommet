import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, DataChart, Grommet, Text } from 'grommet';
import { grommet } from 'grommet/themes';
var data = [];

for (var i = 0; i < 8; i += 1) {
  var v = Math.sin(i / 2.0);
  data.push({
    date: "2020-" + (i % 12 + 1).toString().padStart(2, 0) + "-01",
    percent: Math.abs(v * 100)
  });
}

var AxesDataChart = function AxesDataChart() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/React.createElement(DataChart, {
    data: data,
    chart: {
      key: 'percent'
    },
    xAxis: {
      key: 'date',
      guide: true,
      render: function render(i) {
        return /*#__PURE__*/React.createElement(Text, {
          margin: {
            horizontal: 'small'
          }
        }, new Date(data[i].date).toLocaleDateString('en-US', {
          month: 'narrow'
        }));
      }
    },
    yAxis: {
      guide: true,
      labels: 3
    }
  })));
};

storiesOf('DataChart', module).add('Axes', function () {
  return /*#__PURE__*/React.createElement(AxesDataChart, null);
});