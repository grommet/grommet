import React, { useState } from 'react';
import { Box, Calendar, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';
export var Simple = function Simple() {
  var _useState = useState(),
      date = _useState[0],
      setDate = _useState[1];

  var onSelect = function onSelect(nextDate) {
    setDate(nextDate !== date ? nextDate : undefined);
  };

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Calendar, {
    date: date,
    onSelect: onSelect,
    size: "small",
    bounds: ['2018-09-08', '2020-12-13']
  })), /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Calendar, {
    date: date,
    daysOfWeek: true,
    onSelect: onSelect,
    size: "small",
    bounds: ['2018-09-08', '2020-12-13']
  })));
};