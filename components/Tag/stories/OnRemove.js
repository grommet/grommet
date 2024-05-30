"use strict";

exports.__esModule = true;
exports["default"] = exports.OnRemove = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var OnRemove = exports.OnRemove = function OnRemove() {
  var onRemove = function onRemove() {};
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "large",
    gap: "medium",
    align: "start"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Tag, {
    name: "name",
    value: "value",
    onRemove: onRemove
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Tag, {
    value: "value",
    onRemove: onRemove
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Tag, {
    name: "name that is much longer and may need to wrap",
    value: "value",
    onRemove: onRemove
  }));
};
OnRemove.storyName = 'OnRemove';
var _default = exports["default"] = {
  title: 'Type/Tag/OnRemove'
};