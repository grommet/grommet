"use strict";

exports.__esModule = true;
exports["default"] = exports.Simple = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Simple = exports.Simple = function Simple() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    width: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.FileInput, {
    "aria-label": "Choose files",
    onChange: function onChange(event, _ref) {
      var files = _ref.files;
      var fileList = files;
      for (var i = 0; i < fileList.length; i += 1) {
        var file = fileList[i];
        console.log(file.name);
      }
    }
  })));
};
var _default = exports["default"] = {
  title: 'Input/FileInput/Simple'
};