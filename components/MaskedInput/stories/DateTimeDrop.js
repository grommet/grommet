"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _grommetIcons = require("grommet-icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DropContent = function DropContent(_ref) {
  var initialDate = _ref.date,
      initialTime = _ref.time,
      onClose = _ref.onClose;

  var _React$useState = _react["default"].useState(),
      date = _React$useState[0],
      setDate = _React$useState[1];

  var _React$useState2 = _react["default"].useState(),
      time = _React$useState2[0],
      setTime = _React$useState2[1];

  var close = function close() {
    return onClose(date || initialDate, time || initialTime);
  };

  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Calendar, {
    animate: false,
    date: date || initialDate,
    onSelect: setDate,
    showAdjacentDays: false
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    flex: false,
    pad: "medium",
    gap: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Keyboard, {
    onEnter: function onEnter(event) {
      event.preventDefault(); // so drop doesn't re-open

      close();
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.MaskedInput, {
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
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    flex: false
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "Done",
    onClick: close
  }))));
};

var DateTimeDropButton = function DateTimeDropButton() {
  var _React$useState3 = _react["default"].useState(),
      date = _React$useState3[0],
      setDate = _React$useState3[1];

  var _React$useState4 = _react["default"].useState(''),
      time = _React$useState4[0],
      setTime = _React$useState4[1];

  var _React$useState5 = _react["default"].useState(),
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

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.DropButton, {
    open: open,
    onClose: function onClose() {
      return setOpen(false);
    },
    onOpen: function onOpen() {
      return setOpen(true);
    },
    dropContent: /*#__PURE__*/_react["default"].createElement(DropContent, {
      date: date,
      time: time,
      onClose: onClose
    })
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    gap: "medium",
    align: "center",
    pad: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    color: date ? undefined : 'dark-5'
  }, date ? new Date(date).toLocaleDateString() + " " + time : 'Select date & time'), /*#__PURE__*/_react["default"].createElement(_grommetIcons.Schedule, null)))));
};

(0, _react2.storiesOf)('MaskedInput', module).add('Date Time Drop', function () {
  return /*#__PURE__*/_react["default"].createElement(DateTimeDropButton, null);
});