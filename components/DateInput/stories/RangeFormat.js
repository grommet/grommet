"use strict";

exports.__esModule = true;
exports["default"] = exports.RangeFormat = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var RangeFormat = exports.RangeFormat = function RangeFormat() {
  var _React$useState = _react["default"].useState(['2020-07-31T15:24:26.256Z', '2020-08-07T15:24:26.256Z']),
    value = _React$useState[0],
    setValue = _React$useState[1];
  var onChange = function onChange(event) {
    var nextValue = event.value;
    console.log('onChange iso date:', nextValue);
    console.log('onChange utc date:', new Date(nextValue[0]), new Date(nextValue[1]));
    setValue(nextValue);
  };
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    width: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.DateInput, {
    value: value,
    format: "mm/dd/yyyy-mm/dd/yyyy",
    onChange: onChange
  })));
};
RangeFormat.storyName = 'Range format';
var _default = exports["default"] = {
  title: 'Input/DateInput/Range format'
};