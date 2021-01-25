"use strict";

exports.__esModule = true;
exports.Pattern = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Pattern = function Pattern() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large",
    gap: "medium"
  }, ['squares', 'circles', 'stripesHorizontal', 'stripesVertical', 'stripesDiagonalDown', 'stripesDiagonalUp'].map(function (pattern) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Chart, {
      id: "area",
      type: "area",
      pattern: pattern,
      thickness: "xsmall",
      values: [{
        value: [10, 20]
      }, {
        value: [20, 30]
      }, {
        value: [30, 15]
      }]
    });
  })));
};

exports.Pattern = Pattern;