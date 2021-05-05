import React from 'react';
import { Grommet, Box, Meter } from 'grommet';
import { grommet } from 'grommet/themes';
export var Pie = function Pie() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Meter, {
    type: "pie",
    background: "light-2",
    size: "small",
    values: [{
      value: 70
    }, {
      value: 20
    }, {
      value: 10
    }]
  })));
};
export default {
  title: 'Visualizations/Meter/Pie'
};