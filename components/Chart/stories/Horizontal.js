"use strict";

exports.__esModule = true;
exports["default"] = exports.Horizontal = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var gradient = [{
  value: 0,
  color: 'status-ok'
}, {
  value: 25,
  color: 'status-ok'
}, {
  value: 27,
  color: 'status-warning'
}, {
  value: 30,
  color: 'status-critical'
}];
var Horizontal = exports.Horizontal = function Horizontal() {
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
      }, ['vertical', 'horizontal'].map(function (direction) {
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
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      direction: "row",
      gap: "medium"
    }, ['vertical', 'horizontal'].map(function (direction) {
      return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
        key: direction,
        border: true
      }, /*#__PURE__*/_react["default"].createElement(_grommet.Chart, {
        id: direction,
        type: "line",
        direction: direction,
        color: gradient,
        values: [20, 30, 15],
        size: "small"
      }));
    })))
    // </Grommet>
  );
};
var _default = exports["default"] = {
  title: 'Visualizations/Chart/Horizontal'
};