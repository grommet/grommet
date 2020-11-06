import React, { useState } from 'react';
import { Box, Calendar, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';
export var Multiple = function Multiple() {
  var _useState = useState([]),
      dates = _useState[0],
      setDates = _useState[1];

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Calendar, {
    dates: dates,
    onSelect: function onSelect(date) {
      var nextDates = [].concat(dates);
      var index = nextDates.indexOf(date);

      if (index === -1) {
        nextDates.push(date);
      } else {
        nextDates.splice(index, 1);
      }

      setDates(nextDates);
      console.log('Select', date, nextDates);
    },
    bounds: ['2018-09-08', '2020-12-13']
  })));
};