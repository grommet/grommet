"use strict";

exports.__esModule = true;
exports["default"] = exports.Inline = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Inline = function Inline() {
  var _React$useState = _react["default"].useState(''),
    value = _React$useState[0],
    setValue = _React$useState[1];
  var onChange = function onChange(event) {
    var nextValue = event.value;
    console.log('onChange iso date:', nextValue);
    console.log('onChange utc date:', new Date(nextValue));
    setValue(nextValue);
  };
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.DateInput, {
    inline: true,
    value: value,
    onChange: onChange
  }));
};
exports.Inline = Inline;
var _default = {
  title: 'Input/DateInput/Inline'
};
exports["default"] = _default;