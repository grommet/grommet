"use strict";

exports.__esModule = true;
exports["default"] = exports.Animation = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("../../../themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Animation = function Animation() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Grid, {
    columns: "small",
    gap: "medium"
  }, ['fadeIn', 'fadeOut', 'jiggle', 'pulse', 'rotateRight', 'rotateLeft', 'slideUp', 'slideDown', 'slideLeft', 'slideRight', 'zoomIn', 'zoomOut'].map(function (animation) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      key: animation,
      pad: "large",
      background: "brand",
      animation: {
        type: animation,
        duration: 4000
      },
      align: "center"
    }, animation);
  }))));
};

exports.Animation = Animation;
var _default = {
  title: 'Layout/Box/Animation'
};
exports["default"] = _default;