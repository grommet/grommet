"use strict";

exports.__esModule = true;
exports["default"] = exports.Round = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Round = function Round() {
  var src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    alignContent: "center",
    gap: "small",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
    size: "large",
    src: src,
    round: false
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
    size: "large",
    src: src,
    round: "xsmall"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
    size: "large",
    src: src,
    round: "small"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
    size: "large",
    src: src,
    round: "medium"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
    size: "large",
    src: src,
    round: "large"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
    size: "large",
    src: src
  })));
};

exports.Round = Round;
var _default = {
  title: 'Visualizations/Avatar/Round'
};
exports["default"] = _default;