"use strict";

exports.__esModule = true;
exports["default"] = exports.Vertical = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Vertical = function Vertical() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    _react["default"].createElement(_grommet.Box, {
      align: "center",
      pad: "large",
      gap: "large"
    }, ['bar', 'line', 'area', 'point'].map(function (type) {
      return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
        key: type,
        direction: "row",
        gap: "medium"
      }, ['horizontal', 'vertical'].map(function (direction) {
        return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
          key: direction,
          border: true
        }, /*#__PURE__*/_react["default"].createElement(_grommet.Chart, {
          type: type,
          direction: direction,
          size: "small",
          values: [[10, 20], [20, 30], [30, 15]]
        }));
      }));
    }))
    // </Grommet>
  );
};
exports.Vertical = Vertical;
var _default = {
  title: 'Visualizations/Chart/Vertical'
};
exports["default"] = _default;