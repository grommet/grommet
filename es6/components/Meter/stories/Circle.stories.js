import React, { useState, useEffect } from 'react';
import { Box, Meter } from 'grommet';
export var Circle = function Circle() {
  var _useState = useState(20),
    value = _useState[0],
    setValue = _useState[1];
  useEffect(function () {
    var interval = setInterval(function () {
      setValue(value < 60 ? value + 8 : 20);
    }, 2000);
    return function () {
      return clearInterval(interval);
    };
  }, [value]);
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    React.createElement(Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/React.createElement(Meter, {
      type: "circle",
      background: "light-2",
      values: [{
        value: value,
        color: value > 50 ? 'status-critical' : 'status-ok'
      }]
    }))
    // </Grommet>
  );
};
export default {
  title: 'Visualizations/Meter/Circle'
};