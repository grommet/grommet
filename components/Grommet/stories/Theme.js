"use strict";

exports.__esModule = true;
exports["default"] = exports.Theme = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _grommetIcons = require("grommet-icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var customTheme = {
  global: {
    colors: {
      custom: '#cc6633'
    }
  }
};

var Theme = function Theme() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: customTheme
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Add, null),
    label: "Add",
    color: "custom"
  })));
};

exports.Theme = Theme;
var _default = {
  title: 'Utilities/Grommet/Theme'
};
exports["default"] = _default;