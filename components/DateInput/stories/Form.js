"use strict";

exports.__esModule = true;
exports["default"] = exports.DateForm = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var DateForm = exports.DateForm = function DateForm() {
  var _React$useState = _react["default"].useState({
      value: ''
    }),
    value = _React$useState[0],
    setValue = _React$useState[1];
  var onChange = function onChange(nextValue) {
    console.log('onChange iso date:', nextValue);
    console.log('onChange utc date:', new Date(nextValue.value));
    setValue(nextValue);
  };
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Form, {
    value: value,
    onChange: onChange,
    onSubmit: function onSubmit(_ref) {
      var nextValue = _ref.value;
      console.log(nextValue);
      setValue({
        value: ''
      });
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    name: "value",
    label: "value",
    required: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.DateInput, {
    name: "value",
    format: "mm/dd/yyyy"
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    type: "submit",
    label: "submit"
  })));
};
DateForm.storyName = 'Form';
var _default = exports["default"] = {
  title: 'Input/DateInput/Form'
};