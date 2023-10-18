"use strict";

exports.__esModule = true;
exports["default"] = exports.Fill = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Fill = exports.Fill = function Fill() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Stack, {
      fill: true
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      background: "brand",
      fill: true
    }, "Test"))
    // </Grommet>
  );
};

Fill.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Layout/Stack/Fill'
};