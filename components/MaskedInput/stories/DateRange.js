"use strict";

exports.__esModule = true;
exports["default"] = exports.DateRange = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var daysInMonth = function daysInMonth(month) {
  return new Date(2019, month, 0).getDate();
};

var DateRange = function DateRange() {
  var _React$useState = _react["default"].useState(''),
      value = _React$useState[0],
      setValue = _React$useState[1];

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    full: true,
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    width: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.MaskedInput, {
    mask: [{
      length: [1, 2],
      options: Array.from({
        length: 12
      }, function (v, k) {
        return k + 1;
      }),
      regexp: /^1[0,1-2]$|^0?[1-9]$|^0$/,
      placeholder: 'mm'
    }, {
      fixed: '/'
    }, {
      length: [1, 2],
      options: Array.from({
        length: daysInMonth(parseInt(value.split('/')[0], 10))
      }, function (v, k) {
        return k + 1;
      }),
      regexp: /^[1-2][0-9]$|^3[0-1]$|^0?[1-9]$|^0$/,
      placeholder: 'dd'
    }, {
      fixed: '/'
    }, {
      length: 4,
      options: Array.from({
        length: 100
      }, function (v, k) {
        return 2019 - k;
      }),
      regexp: /^[1-2]$|^19$|^20$|^19[0-9]$|^20[0-9]$|^19[0-9][0-9]$|^20[0-9][0-9]$/,
      placeholder: 'yyyy'
    }, {
      fixed: ' - '
    }, {
      length: [1, 2],
      options: Array.from({
        length: 12
      }, function (v, k) {
        return k + 1;
      }),
      regexp: /^1[0,1-2]$|^0?[1-9]$|^0$/,
      placeholder: 'mm'
    }, {
      fixed: '/'
    }, {
      length: [1, 2],
      options: Array.from({
        length: daysInMonth(parseInt(value.split('/')[0], 10))
      }, function (v, k) {
        return k + 1;
      }),
      regexp: /^[1-2][0-9]$|^3[0-1]$|^0?[1-9]$|^0$/,
      placeholder: 'dd'
    }, {
      fixed: '/'
    }, {
      length: 4,
      options: Array.from({
        length: 100
      }, function (v, k) {
        return 2019 - k;
      }),
      regexp: /^[1-2]$|^19$|^20$|^19[0-9]$|^20[0-9]$|^19[0-9][0-9]$|^20[0-9][0-9]$/,
      placeholder: 'yyyy'
    }],
    value: value,
    onChange: function onChange(event) {
      return setValue(event.target.value);
    }
  }))));
};

exports.DateRange = DateRange;
DateRange.storyName = 'Date range';
var _default = {
  title: 'Input/MaskedInput/Date range'
};
exports["default"] = _default;