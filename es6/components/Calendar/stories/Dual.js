import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Button, Calendar, Grommet, Heading } from 'grommet';
import { grommet } from 'grommet/themes';
import { Blank } from "grommet-icons/es6/icons/Blank";
import { Previous } from "grommet-icons/es6/icons/Previous";
import { Next } from "grommet-icons/es6/icons/Next";

var DualCalendar = function DualCalendar() {
  var _useState = useState(),
      date = _useState[0],
      setDate = _useState[1];

  var _useState2 = useState(),
      dates = _useState2[0],
      setDates = _useState2[1];

  var _useState3 = useState('2020-08-07T15:13:47.290Z'),
      reference1 = _useState3[0],
      setReference1 = _useState3[1];

  var _useState4 = useState('2020-09-01T15:15:34.916Z'),
      reference2 = _useState4[0],
      setReference2 = _useState4[1];

  var onSelect = function onSelect(arg) {
    if (Array.isArray(arg)) {
      setDate(undefined);
      setDates(arg);
    } else {
      setDate(arg);
      setDates(undefined);
    }
  };

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    justify: "center",
    pad: "large",
    direction: "row",
    gap: "small"
  }, /*#__PURE__*/React.createElement(Calendar, {
    animate: false,
    showAdjacentDays: false,
    range: true,
    date: date,
    dates: dates,
    onSelect: onSelect,
    reference: reference1,
    onReference: function onReference(reference) {
      var refDate = new Date(reference);
      var nextDate = new Date(refDate);
      console.log(refDate);
      console.log(nextDate);
      nextDate.setMonth(refDate.getMonth() + 1, 1);
      setReference1(refDate);
      setReference2(nextDate);
    },
    header: function header(_ref) {
      var currentDate = _ref.date,
          locale = _ref.locale,
          onPreviousMonth = _ref.onPreviousMonth,
          previousInBound = _ref.previousInBound;
      return /*#__PURE__*/React.createElement(Box, {
        direction: "row",
        align: "center",
        justify: "between"
      }, /*#__PURE__*/React.createElement(Button, {
        disabled: !previousInBound,
        icon: /*#__PURE__*/React.createElement(Previous, null),
        onClick: onPreviousMonth
      }), /*#__PURE__*/React.createElement(Heading, {
        level: 3,
        margin: "none"
      }, currentDate.toLocaleDateString(locale, {
        month: 'long',
        year: 'numeric'
      })), /*#__PURE__*/React.createElement(Blank, null));
    }
  }), /*#__PURE__*/React.createElement(Calendar, {
    animate: false,
    showAdjacentDays: false,
    date: date,
    dates: dates,
    range: true,
    onSelect: onSelect,
    reference: reference2,
    onReference: function onReference(reference) {
      var refDate = new Date(reference);
      var priorDate = new Date(refDate);
      priorDate.setMonth(refDate.getMonth() - 1, 1);
      setReference1(priorDate);
      setReference2(refDate);
    },
    header: function header(_ref2) {
      var currentDate = _ref2.date,
          locale = _ref2.locale,
          onNextMonth = _ref2.onNextMonth,
          nextInBound = _ref2.nextInBound;
      return /*#__PURE__*/React.createElement(Box, {
        direction: "row",
        align: "center",
        justify: "between"
      }, /*#__PURE__*/React.createElement(Blank, null), /*#__PURE__*/React.createElement(Heading, {
        level: 3,
        margin: "none"
      }, currentDate.toLocaleDateString(locale, {
        month: 'long',
        year: 'numeric'
      })), /*#__PURE__*/React.createElement(Button, {
        disabled: !nextInBound,
        icon: /*#__PURE__*/React.createElement(Next, null),
        onClick: onNextMonth
      }));
    }
  })));
};

storiesOf('Calendar', module).add('Dual', function () {
  return /*#__PURE__*/React.createElement(DualCalendar, null);
});