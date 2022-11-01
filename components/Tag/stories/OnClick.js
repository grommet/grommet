"use strict";

exports.__esModule = true;
exports["default"] = exports.OnClick = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var OnClick = function OnClick() {
  var onClick = function onClick() {};
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "large",
    gap: "medium",
    align: "start"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Tag, {
    name: "name",
    value: "value",
    onClick: onClick
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Tag, {
    value: "value",
    onClick: onClick
  }));
};
exports.OnClick = OnClick;
OnClick.storyName = 'OnClick';
var _default = {
  title: 'Type/Tag/OnClick'
};
exports["default"] = _default;