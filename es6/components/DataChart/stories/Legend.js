import React from 'react';
import { Box, DataChart, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';
var data = [];

for (var i = 1; i < 8; i += 1) {
  var v = Math.sin(i / 2.0);
  data.push({
    date: "2020-07-" + (i % 30 + 1).toString().padStart(2, 0),
    percent: Math.abs(v * 100),
    amount: i
  });
}

export var Legend = function Legend() {
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
      label: 'Date'
    }, {
      property: 'percent',
      label: 'Percent',
      render: function render(value) {
        return Math.round(value) + "%";
      }
    }, {
      property: 'amount',
      label: 'Amount'
    }],
    chart: ['percent', {
      property: 'amount',
      thickness: 'small'
    }],
    legend: true,
    axis: {
      x: {
        property: 'date',
        granularity: 'medium'
      }
    }
  })));
};
export default {
  title: 'Visualizations/DataChart/Legend'
};