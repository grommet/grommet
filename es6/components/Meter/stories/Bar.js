import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, Meter } from 'grommet';
import { grommet } from 'grommet/themes';

var BarMeter = function BarMeter() {
  var value = 30;
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Meter, {
    type: "bar",
    background: "light-2",
    values: [{
      value: value
    }]
  })));
};

storiesOf('Meter', module).add('Bar', function () {
  return /*#__PURE__*/React.createElement(BarMeter, null);
});