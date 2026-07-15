import React, { useState } from 'react';
import { Box, Button, Calendar, Text } from 'grommet';
import { FormPreviousLink } from "grommet-icons/es6/icons/FormPreviousLink";
import { FormNextLink } from "grommet-icons/es6/icons/FormNextLink";
var reference = '2026-04-12T21:09:16.501Z';
var end = new Date(reference);
var start = new Date(end.getTime() - 1000 * 60 * 60 * 24 * 90); // 90 days ago
var bounds = [start.getFullYear() + "-" + (start.getMonth() + 1) + "-" + start.getDate(), end.getFullYear() + "-" + (end.getMonth() + 1) + "-" + end.getDate()];
export var CustomHeaderCalendar = function CustomHeaderCalendar() {
  var _useState = useState(),
    date = _useState[0],
    setDate = _useState[1];
  var onSelect = function onSelect(nextDate) {
    setDate(nextDate !== date ? nextDate : undefined);
  };
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/React.createElement(Calendar, {
      date: date,
      onSelect: onSelect,
      size: "small",
      bounds: bounds,
      reference: reference,
      header: function header(_ref) {
        var currentDate = _ref.date,
          locale = _ref.locale,
          onPreviousMonth = _ref.onPreviousMonth,
          onNextMonth = _ref.onNextMonth,
          previousInBound = _ref.previousInBound,
          nextInBound = _ref.nextInBound;
        return /*#__PURE__*/React.createElement(Box, {
          direction: "row",
          align: "center",
          justify: "between"
        }, /*#__PURE__*/React.createElement(Button, {
          disabled: !previousInBound,
          onClick: onPreviousMonth
        }, /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(FormPreviousLink, null))), /*#__PURE__*/React.createElement(Text, {
          size: "small"
        }, /*#__PURE__*/React.createElement("strong", null, currentDate.toLocaleDateString(locale, {
          month: 'long',
          year: 'numeric'
        }))), /*#__PURE__*/React.createElement(Button, {
          disabled: !nextInBound,
          onClick: onNextMonth
        }, /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(FormNextLink, null))));
      }
    }))
    // </Grommet>
  );
};
CustomHeaderCalendar.storyName = 'Header';
export default {
  title: 'Visualizations/Calendar/Header'
};