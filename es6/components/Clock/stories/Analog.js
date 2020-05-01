import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, Clock } from 'grommet';
import { grommet } from 'grommet/themes';

var AnalogClock = function AnalogClock() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Clock, {
    type: "analog"
  })));
};

storiesOf('Clock', module).add('Analog', function () {
  return /*#__PURE__*/React.createElement(AnalogClock, null);
}, {
  chromatic: {
    disable: true
  }
});