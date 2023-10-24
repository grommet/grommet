"use strict";

exports.__esModule = true;
exports["default"] = exports.MaxSize = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var MaxSize = exports.MaxSize = function MaxSize() {
  var maxSize = 5000000;
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
    label: "File Input With Max Size",
    name: "fileInput",
    htmlFor: "fileInput",
    required: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.FileInput, {
    name: "fileInput",
    id: "fileInput",
    multiple: true,
    maxSize: maxSize
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "Submit",
    primary: true,
    type: "submit"
  }))));
};
var _default = exports["default"] = {
  title: 'Input/FileInput/Max Size'
};