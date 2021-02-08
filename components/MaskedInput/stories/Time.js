"use strict";

exports.__esModule = true;
exports["default"] = exports.Time = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Time = function Time() {
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
    value: value,
    onChange: function onChange(event) {
      return setValue(event.target.value);
    }
  }))));
};

exports.Time = Time;
var _default = {
  title: 'Input/MaskedInput/Time'
};
exports["default"] = _default;