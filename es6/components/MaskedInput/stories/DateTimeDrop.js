import React from 'react';
import { Box, Button, Grommet, Keyboard, Text, Calendar, MaskedInput, DropButton } from 'grommet';
import { grommet } from 'grommet/themes';
import { Schedule } from "grommet-icons/es6/icons/Schedule";

var DropContent = function DropContent(_ref) {
  var initialDate = _ref.date,
      initialTime = _ref.time,
      onClose = _ref.onClose;

  var _React$useState = React.useState(),
      date = _React$useState[0],
      setDate = _React$useState[1];

  var _React$useState2 = React.useState(),
      time = _React$useState2[0],
      setTime = _React$useState2[1];

  var close = function close() {
    return onClose(date || initialDate, time || initialTime);
  };

  return /*#__PURE__*/React.createElement(Box, {
    align: "center"
  }, /*#__PURE__*/React.createElement(Calendar, {
    animate: false,
    date: date || initialDate,
    onSelect: setDate,
    showAdjacentDays: false
  }), /*#__PURE__*/React.createElement(Box, {
    flex: false,
    pad: "medium",
    gap: "medium"
  }, /*#__PURE__*/React.createElement(Keyboard, {
    onEnter: function onEnter(event) {
      event.preventDefault(); // so drop doesn't re-open

      close();
    }
  }, /*#__PURE__*/React.createElement(MaskedInput, {
    mask: [{
      length: [1, 2],
      options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      regexp: /^1[1-2]$|^[0-9]$/,
      placeholder: 'hh'
    }, {
      fixed: ':'
    }, {
      length: 2,
      options: ['00', '15', '30', '45'],
      regexp: /^[0-5][0-9]$|^[0-9]$/,
      placeholder: 'mm'
    }, {
      fixed: ' '
    }, {
      length: 2,
      options: ['am', 'pm'],
      regexp: /^[ap]m$|^[AP]M$|^[aApP]$/,
      placeholder: 'ap'
    }],
    value: time || initialTime,
    name: "maskedInput",
    onChange: function onChange(event) {
      return setTime(event.target.value);
    }
  })), /*#__PURE__*/React.createElement(Box, {
    flex: false
  }, /*#__PURE__*/React.createElement(Button, {
    label: "Done",
    onClick: close
  }))));
};

export var DateTimeDropButton = function DateTimeDropButton() {
  var _React$useState3 = React.useState(),
      date = _React$useState3[0],
      setDate = _React$useState3[1];

  var _React$useState4 = React.useState(''),
      time = _React$useState4[0],
      setTime = _React$useState4[1];

  var _React$useState5 = React.useState(),
      open = _React$useState5[0],
      setOpen = _React$useState5[1];

  var onClose = function onClose(nextDate, nextTime) {
    setDate(nextDate);
    setTime(nextTime);
    setOpen(false);
    setTimeout(function () {
      return setOpen(undefined);
    }, 1);
  };

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(DropButton, {
    open: open,
    onClose: function onClose() {
      return setOpen(false);
    },
    onOpen: function onOpen() {
      return setOpen(true);
    },
    dropContent: /*#__PURE__*/React.createElement(DropContent, {
      date: date,
      time: time,
      onClose: onClose
    })
  }, /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    gap: "medium",
    align: "center",
    pad: "small"
  }, /*#__PURE__*/React.createElement(Text, {
    color: date ? undefined : 'dark-5'
  }, date ? new Date(date).toLocaleDateString() + " " + time : 'Select date & time'), /*#__PURE__*/React.createElement(Schedule, null)))));
};
DateTimeDropButton.storyName = 'Date time drop';
export default {
  title: 'Input/MaskedInput/Date time drop'
};