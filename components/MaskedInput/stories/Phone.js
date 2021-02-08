"use strict";

exports.__esModule = true;
exports["default"] = exports.Phone = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Phone = function Phone() {
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
      fixed: '('
    }, {
      length: 3,
      regexp: /^[0-9]{1,3}$/,
      placeholder: 'xxx'
    }, {
      fixed: ')'
    }, {
      fixed: ' '
    }, {
      length: 3,
      regexp: /^[0-9]{1,3}$/,
      placeholder: 'xxx'
    }, {
      fixed: '-'
    }, {
      length: 4,
      regexp: /^[0-9]{1,4}$/,
      placeholder: 'xxxx'
    }],
    value: value,
    onChange: function onChange(event) {
      return setValue(event.target.value);
    }
  }))));
};

exports.Phone = Phone;
var _default = {
  title: 'Input/MaskedInput/Phone'
};
exports["default"] = _default;