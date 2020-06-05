import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, DataChart, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';
var data = [];

for (var i = 0; i < 7; i += 1) {
  var v = Math.sin(i / 2.0);
  data.push({
    date: "2020-07-" + (i % 30 + 1).toString().padStart(2, 0),
    percent: Math.abs(v * 100)
  });
}

var SimpleDataChart = function SimpleDataChart() {
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
    }
  })));
};

storiesOf('DataChart', module).add('Simple', function () {
  return /*#__PURE__*/React.createElement(SimpleDataChart, null);
});