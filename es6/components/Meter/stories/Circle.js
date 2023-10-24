import React, { useState, useEffect, useRef } from 'react';
import { Box, Meter } from 'grommet';
export var Circle = function Circle() {
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
        color: value > 50 ? 'accent-2' : 'accent-1'
      }]
    }))
    // </Grommet>
  );
};

export default {
  title: 'Visualizations/Meter/Circle'
};