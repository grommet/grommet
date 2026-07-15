import React, { useState } from 'react';
import { Box, Calendar } from 'grommet';
var initialMonth = '2026-03-12T21:09:16.501Z';
export var Multiple = function Multiple() {
  var _useState = useState(),
    dates = _useState[0],
    setDates = _useState[1];
  var _useState2 = useState(initialMonth),
    reference = _useState2[0],
    setReference = _useState2[1];
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
        var nextDates = dates ? [].concat(dates) : [];
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
      reference: reference,
      onReference: setReference
    }))
    // </Grommet>
  );
};
export default {
  title: 'Visualizations/Calendar/Multiple'
};