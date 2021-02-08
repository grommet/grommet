"use strict";

exports.__esModule = true;
exports["default"] = exports.All = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var sizes = ['6xl', '5xl', '4xl', '3xl', '2xl', 'xxlarge', 'xlarge', 'large', 'medium', 'small', 'xsmall', '77px'];

var All = function All() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, sizes.map(function (size) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      key: size,
      margin: "small"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      size: size
    }, "Text " + size));
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    background: "light-3",
    align: "end",
    width: "small",
    pad: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    truncate: true
  }, "This is a long truncated string of text that is aligned to the end."))));
};

exports.All = All;
var _default = {
  title: 'Type/Text/All'
};
exports["default"] = _default;