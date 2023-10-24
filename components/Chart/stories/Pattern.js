"use strict";

exports.__esModule = true;
exports["default"] = exports.Pattern = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Pattern = exports.Pattern = function Pattern() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    _react["default"].createElement(_grommet.Box, {
      align: "center",
      pad: "large",
      gap: "medium"
    }, ['squares', 'circles', 'stripesHorizontal', 'stripesVertical', 'stripesDiagonalDown', 'stripesDiagonalUp'].map(function (pattern) {
      return /*#__PURE__*/_react["default"].createElement(_grommet.Chart, {
        key: pattern,
        id: "area-" + pattern,
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
    }))
    // </Grommet>
  );
};
var _default = exports["default"] = {
  title: 'Visualizations/Chart/Pattern'
};