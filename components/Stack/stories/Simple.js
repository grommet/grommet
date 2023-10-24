"use strict";

exports.__esModule = true;
exports["default"] = exports.Simple = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _grommetIcons = require("grommet-icons");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Simple = exports.Simple = function Simple() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Stack, {
      anchor: "top-right"
    }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Cart, {
      size: "large"
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      background: "orange",
      pad: {
        horizontal: 'xsmall'
      },
      round: true
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      size: "small"
    }, "4"))))
    // </Grommet>
  );
};
var _default = exports["default"] = {
  title: 'Layout/Stack/Simple'
};