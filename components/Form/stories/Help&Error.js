"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var FormFieldHelpError = function FormFieldHelpError(props) {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _grommet.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Form, null, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, _extends({
    label: "Label",
    htmlFor: "text-input"
  }, props, {
    help: "Text to help the user know what is possible",
    error: "Text to call attention to an issue with this field"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
    id: "text-input",
    placeholder: "placeholder",
    value: "Value",
    onChange: function onChange() {}
  })))));
};

(0, _react2.storiesOf)('Form', module).add('Help and Error', function () {
  return /*#__PURE__*/_react["default"].createElement(FormFieldHelpError, null);
});