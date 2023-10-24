import React, { useState } from 'react';
import { Box, Calendar } from 'grommet';
export var Multiple = function Multiple() {
  var _useState = useState([]),
    dates = _useState[0],
    setDates = _useState[1];
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
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
        console.log('Select iso date:', date, nextDates);
        console.log('Select utc date:', new Date(date));
      },
      bounds: ['2020-09-08', '2025-12-13']
    }))
    // </Grommet>
  );
};

export default {
  title: 'Visualizations/Calendar/Multiple'
};