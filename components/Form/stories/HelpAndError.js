"use strict";

exports.__esModule = true;
exports["default"] = exports.HelpAndError = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var HelpAndError = exports.HelpAndError = function HelpAndError() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
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
    }))), /*#__PURE__*/_react["default"].createElement(_grommet.Form, null, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      label: "Email",
      htmlFor: "email",
      help: /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
        weight: "lighter",
        size: "small"
      }, "Text to help the user know what is possible"),
      error: /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
        align: "center",
        background: "background-front"
      }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
        weight: "bolder",
        align: "center",
        size: "small"
      }, "Custom Text to call attention to an issue with this field"))
    }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
      id: "email",
      value: "jane@hpe",
      onChange: function onChange() {}
    }))))
    // </Grommet>
  );
};

HelpAndError.storyName = 'Help and error';
var _default = exports["default"] = {
  title: 'Input/Form/Help and error'
};