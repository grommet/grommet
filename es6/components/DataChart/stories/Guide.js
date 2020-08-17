import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, DataChart, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';
var data = [];

for (var i = 1; i < 8; i += 1) {
  var v = Math.sin(i / 2.0);
  data.push({
    date: "2020-" + (i % 12 + 1).toString().padStart(2, 0) + "-01",
    percent: Math.abs(v * 100)
  });
}

var Example = function Example() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/React.createElement(DataChart, {
    data: data,
    series: "percent",
    guide: {
      x: {
        granularity: 'fine'
      },
      y: {
        granularity: 'medium'
      }
    }
  })));
};

storiesOf('DataChart', module).add('Guide', function () {
  return /*#__PURE__*/React.createElement(Example, null);
});