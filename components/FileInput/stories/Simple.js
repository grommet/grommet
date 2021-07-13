"use strict";

exports.__esModule = true;
exports["default"] = exports.Simple = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Simple = function Simple() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    full: true,
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    width: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.FileInput, {
    onChange: function onChange(event, _ref) {
      var files = _ref.files;
      var fileList = files;

      for (var i = 0; i < fileList.length; i += 1) {
        var file = fileList[i];
        console.log(file.name);
      }
    }
  }))));
};

exports.Simple = Simple;
var _default = {
  title: 'Input/FileInput/Simple'
};
exports["default"] = _default;