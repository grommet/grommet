"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Example = function Example() {
  var _React$useState = _react["default"].useState({
    value: ''
  }),
      value = _React$useState[0],
      setValue = _React$useState[1];

  var onChange = function onChange(nextValue) {
    console.log('onChange', nextValue);
    setValue(nextValue);
  };

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Form, {
    value: value,
    onChange: onChange,
    onSubmit: function onSubmit(_ref) {
      var nextValue = _ref.value;
      return console.log(nextValue);
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
  }))));
};

(0, _react2.storiesOf)('DateInput', module).add('Form', function () {
  return /*#__PURE__*/_react["default"].createElement(Example, null);
});