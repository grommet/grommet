import React from 'react';
import { Box, DataChart, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';
var data = [];

for (var i = 0; i < 13; i += 1) {
  var v = -Math.sin(i / 2.0);
  var v2 = Math.cos(i / 2.0);
  data.push({
    date: "2020-07-" + (i % 30 + 1).toString().padStart(2, 0),
    amount: Math.floor(v * 10),
    need: Math.floor(v2 * 9),
    needMax: Math.floor(v2 * 9) + i / 2,
    needMin: Math.floor(v2 * 9) - i / 2,
    growth: i
  });
}

export var Everything = function Everything() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/React.createElement(DataChart, {
    data: data,
    series: ['date', 'amount', 'need', 'growth'],
    bounds: "align",
    chart: [{
      property: 'amount',
      type: 'area',
      thickness: 'xsmall',
      color: 'graph-2',
      opacity: 'medium'
    }, {
      property: 'amount',
      type: 'line',
      thickness: 'xxsmall',
      round: true
    }, {
      property: 'amount',
      type: 'bar',
      thickness: 'hair'
    }, {
      property: 'amount',
      type: 'point',
      thickness: 'small'
    }, {
      property: ['needMin', 'needMax'],
      type: 'area',
      thickness: 'xsmall',
      color: 'graph-3',
      opacity: 'medium'
    }, {
      property: 'need',
      type: 'line',
      thickness: 'xxsmall',
      dash: true,
      round: true
    }, {
      property: 'need',
      type: 'point',
      thickness: 'small'
    }, {
      property: 'growth',
      type: 'line',
      thickness: 'hair'
    }],
    axis: {
      x: 'date',
      y: {
        property: 'amount',
        granularity: 'medium'
      }
    },
    guide: {
      y: {
        granularity: 'medium'
      },
      x: {
        granularity: 'fine'
      }
    },
    gap: "xsmall",
    pad: "small",
    legend: true,
    detail: true
  })));
};
export default {
  title: 'Visualizations/DataChart/Everything'
};