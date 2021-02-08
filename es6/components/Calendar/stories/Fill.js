import React from 'react';
import { Box, Calendar, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';
export var Fill = function Fill() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center"
  }, /*#__PURE__*/React.createElement(Box, {
    height: "large",
    width: "large",
    border: true
  }, /*#__PURE__*/React.createElement(Calendar, {
    fill: true,
    daysOfWeek: true
  }))));
};
export default {
  title: 'Visualizations/Calendar/Fill'
};