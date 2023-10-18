"use strict";

exports.__esModule = true;
exports["default"] = exports.Simple = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Simple = exports.Simple = function Simple() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    justify: "center",
    pad: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.ThumbsRating, {
    id: "thumb-rating",
    name: "rating"
  }));
};
var _default = exports["default"] = {
  title: 'Input/ThumbsRating/Simple'
};