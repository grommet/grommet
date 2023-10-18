"use strict";

exports.__esModule = true;
exports["default"] = exports.Multiple = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Multiple = exports.Multiple = function Multiple() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    width: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.FileInput, {
    "aria-label": "Choose files",
    multiple: {
      max: 5
    },
    onChange: function onChange(event, _ref) {
      var files = _ref.files;
      console.log(event);
      console.log(event.target.files);
      for (var i = 0; i < files.length; i += 1) {
        var file = files[i];
        console.log(file.name);
      }
    }
  })));
};
var _default = exports["default"] = {
  title: 'Input/FileInput/Multiple'
};