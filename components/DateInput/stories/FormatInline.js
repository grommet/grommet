"use strict";

exports.__esModule = true;
exports["default"] = exports.FormatInline = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var FormatInline = function FormatInline() {
  var _React$useState = _react["default"].useState(''),
      value = _React$useState[0],
      setValue = _React$useState[1];

  var onChange = function onChange(event) {
    var nextValue = event.value;
    console.log('onChange', nextValue);
    setValue(nextValue);
  };

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.DateInput, {
    format: "mm/dd/yyyy",
    inline: true,
    value: value,
    onChange: onChange
  })));
};

exports.FormatInline = FormatInline;
FormatInline.storyName = 'Format inline';
var _default = {
  title: 'Input/DateInput/Format inline'
};
exports["default"] = _default;