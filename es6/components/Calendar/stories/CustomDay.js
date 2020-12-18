import React, { useState } from 'react';
import { Box, Calendar, DropButton, Grommet, Heading, Stack, Text } from 'grommet';
import { Notification } from "grommet-icons/es6/icons/Notification";
import { grommet } from 'grommet/themes';
export var CustomDayCalendar = function CustomDayCalendar() {
  var calendarContent = [7, 8, 9];

  var _useState = useState(),
      selectedDay = _useState[0],
      setSelectedDay = _useState[1];

  var onSelect = function onSelect(value) {
    setSelectedDay(value);
  };

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Heading, {
    level: 4
  }, "Example without onSelect set"), /*#__PURE__*/React.createElement(Calendar, {
    date: selectedDay,
    fill: true
  }, function (_ref) {
    var date = _ref.date,
        day = _ref.day,
        isSelected = _ref.isSelected;
    var hasContent = calendarContent.includes(day);
    return /*#__PURE__*/React.createElement(Box, {
      background: isSelected ? 'light-3' : 'white',
      onClick: function onClick() {
        return onSelect(date.toISOString());
      },
      border: true,
      fill: true
    }, /*#__PURE__*/React.createElement(Stack, {
      anchor: "top-right",
      fill: true
    }, /*#__PURE__*/React.createElement(Box, {
      pad: "small",
      align: "center",
      justify: "center",
      fill: true
    }, /*#__PURE__*/React.createElement(Text, {
      size: "large"
    }, day)), hasContent ? /*#__PURE__*/React.createElement(DropButton, {
      icon: /*#__PURE__*/React.createElement(Notification, {
        size: "small",
        color: "neutral-3"
      }),
      dropContent: /*#__PURE__*/React.createElement(Box, {
        pad: "small"
      }, "Vacation"),
      dropAlign: {
        top: 'bottom'
      }
    }) : null));
  })), /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Heading, {
    level: 4
  }, "Example with onSelect set"), /*#__PURE__*/React.createElement(Calendar, {
    onSelect: onSelect,
    date: selectedDay,
    fill: true
  }, function (_ref2) {
    var day = _ref2.day,
        isSelected = _ref2.isSelected;
    return /*#__PURE__*/React.createElement(Box, {
      background: isSelected ? 'light-3' : 'white',
      border: true,
      fill: true
    }, /*#__PURE__*/React.createElement(Box, {
      pad: "medium",
      align: "center",
      justify: "center",
      fill: true
    }, /*#__PURE__*/React.createElement(Text, {
      size: "large"
    }, day)));
  })));
};
CustomDayCalendar.story = {
  name: 'Custom day'
};