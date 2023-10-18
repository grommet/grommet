"use strict";

exports.__esModule = true;
exports["default"] = exports.PlainLayer = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var PlainLayer = exports.PlainLayer = function PlainLayer() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      fill: true,
      background: "dark-3"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Layer, {
      margin: "medium",
      plain: true
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: "large",
      border: {
        color: 'accent-1',
        size: 'large'
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      color: "accent-2"
    }, "Text"))))
    // </Grommet>
  );
};

PlainLayer.storyName = 'Plain';
PlainLayer.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Layout/Layer/Plain'
};