import React, { useState, useEffect, useRef } from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, Meter } from 'grommet';
import { grommet } from 'grommet/themes';

var CircleMeter = function CircleMeter() {
  var _useState = useState(20),
      value = _useState[0],
      setValue = _useState[1];

  var timer = useRef();
  clearTimeout(timer.current);
  timer.current = setTimeout(function () {
    setValue(value < 100 ? value + 8 : 20);
  }, 2000);
  useEffect(function () {
    return function () {
      clearTimeout(timer.current);
    };
  }, []);
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Meter, {
    type: "circle",
    background: "light-2",
    values: [{
      value: value,
      color: value > 50 ? 'accent-2' : 'accent-1'
    }]
  })));
};

storiesOf('Meter', module).add('Circle', function () {
  return /*#__PURE__*/React.createElement(CircleMeter, null);
});