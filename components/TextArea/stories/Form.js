"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Example = function Example() {
  var _React$useState = _react["default"].useState({
    name: '',
    email: '',
    value: ''
  }),
      value = _React$useState[0],
      setValue = _React$useState[1];

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Form, {
    value: value,
    onChange: function onChange(nextValue) {
      return setValue(nextValue);
    },
    onSubmit: function onSubmit() {
      return console.log(value);
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    name: "value",
    label: "value",
    required: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.TextArea, {
    name: "value"
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    type: "submit",
    label: "submit"
  }))));
};

(0, _react2.storiesOf)('TextArea', module).add('Form', function () {
  return /*#__PURE__*/_react["default"].createElement(Example, null);
});