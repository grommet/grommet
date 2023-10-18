"use strict";

exports.__esModule = true;
exports["default"] = exports.VerticalBar = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var VerticalBar = exports.VerticalBar = function VerticalBar() {
  var value = 30;
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    _react["default"].createElement(_grommet.Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Meter, {
      type: "bar",
      value: value,
      direction: "vertical"
    }))
    // </Grommet>
  );
};
var _default = exports["default"] = {
  title: 'Visualizations/Meter/Vertical Bar'
};