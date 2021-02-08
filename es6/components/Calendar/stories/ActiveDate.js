import React, { useRef, useState } from 'react';
import { Box, Button, Calendar, Grommet, Text } from 'grommet';
import { grommet } from 'grommet/themes';
export var ActiveDate = function ActiveDate() {
  var _useState = useState(),
      datesD = _useState[0],
      setDatesD = _useState[1];

  var _useState2 = useState(undefined),
      activeDate = _useState2[0],
      setActiveDate = _useState2[1];

  var startDateButton = useRef();
  var endDateButton = useRef();
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, /*#__PURE__*/React.createElement(Box, {
    gap: "small",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    gap: "small"
  }, /*#__PURE__*/React.createElement(Button, {
    ref: startDateButton,
    active: activeDate === 'start',
    label: /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Text, null, "Start Date"), /*#__PURE__*/React.createElement(Text, null, datesD && datesD[0][0] && new Date(datesD[0][0]).toDateString())),
    onClick: function onClick() {
      return setActiveDate('start');
    }
  }), /*#__PURE__*/React.createElement(Button, {
    ref: endDateButton,
    active: activeDate === 'end',
    label: /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Text, null, "End Date"), /*#__PURE__*/React.createElement(Text, null, datesD && datesD[0][1] && new Date(datesD[0][1]).toDateString())),
    onClick: function onClick() {
      return setActiveDate('end');
    }
  })), /*#__PURE__*/React.createElement(Calendar, {
    activeDate: activeDate,
    dates: datesD,
    onSelect: function onSelect(arg) {
      setDatesD(arg);
      setActiveDate('end');
    },
    range: "array"
  })));
};
ActiveDate.storyName = 'Active date';
export default {
  title: "Visualizations/Calendar/Active date"
};