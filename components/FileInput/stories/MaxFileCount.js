"use strict";

exports.__esModule = true;
exports["default"] = exports.MaxFileCount = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var MaxFileCount = exports.MaxFileCount = function MaxFileCount() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    width: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Form, {
    validate: "submit"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    name: "fileInput",
    htmlFor: "fileInput",
    required: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.FileInput, {
    "aria-label": "Choose files",
    name: "fileInput",
    id: "fileInput",
    multiple: {
      max: 5
    }
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "Submit",
    primary: true,
    type: "submit"
  }))));
};
var _default = exports["default"] = {
  title: 'Input/FileInput/Max File Count'
};