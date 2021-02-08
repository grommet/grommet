"use strict";

exports.__esModule = true;
exports["default"] = exports.HelpAndError = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var HelpAndError = function HelpAndError() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Form, null, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    label: "Label",
    htmlFor: "text-input",
    help: "Text to help the user know what is possible",
    error: "Text to call attention to an issue with this field"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
    id: "text-input",
    placeholder: "placeholder",
    value: "Value",
    onChange: function onChange() {}
  })))));
};

exports.HelpAndError = HelpAndError;
HelpAndError.storyName = 'Help and error';
var _default = {
  title: 'Input/Form/Help and error'
};
exports["default"] = _default;