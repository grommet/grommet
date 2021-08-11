"use strict";

exports.__esModule = true;
exports["default"] = exports.ResetDateWithArray = exports.ResetDateWithString = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _Button = require("../../Button");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DATE = '2020-07-02T00:00:00-08:00';
var DATES = ['2020-07-02T00:00:00-08:00', '2020-07-07T00:00:00-08:00'];

var ResetDateWithString = function ResetDateWithString() {
  var _React$useState = _react["default"].useState(DATE),
      value = _React$useState[0],
      setValue = _React$useState[1];

  var onChange = function onChange(event) {
    return setValue(event.value);
  };

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _grommet.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "column",
    align: "center",
    justify: "center",
    pad: "large",
    gap: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.DateInput, {
    value: value,
    onChange: onChange,
    format: "mm/dd/yyyy"
  }), /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    label: "Reset Date",
    fill: "vertical",
    onClick: function onClick() {
      return setValue('');
    },
    type: "button"
  })));
};

exports.ResetDateWithString = ResetDateWithString;

var ResetDateWithArray = function ResetDateWithArray() {
  var _React$useState2 = _react["default"].useState(DATES),
      value = _React$useState2[0],
      setValue = _React$useState2[1];

  var onChange = function onChange(event) {
    return setValue(event.value);
  };

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _grommet.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "column",
    align: "center",
    justify: "center",
    pad: "large",
    gap: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.DateInput, {
    value: value,
    onChange: onChange,
    format: "mm/dd/yyyy"
  }), /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    label: "Reset Date",
    fill: "vertical",
    onClick: function onClick() {
      return setValue([]);
    },
    type: "button"
  })));
};

exports.ResetDateWithArray = ResetDateWithArray;
ResetDateWithString.storyName = 'Reset date with string';
ResetDateWithArray.storyName = "Reset date with array";
var _default = {
  title: 'Input/DateInput/Reset date'
};
exports["default"] = _default;