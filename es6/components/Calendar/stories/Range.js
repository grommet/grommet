import React from 'react';
import { Box, Calendar, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';
export var Range = function Range() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Calendar, {
    dates: [['2020-04-03', '2020-04-08']],
    range: true
  })));
};
export default {
  title: 'Visualizations/Calendar/Range'
};