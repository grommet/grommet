"use strict";

exports.__esModule = true;
exports["default"] = exports.Percentages = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Percentages = exports.Percentages = function Percentages() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Grid, {
      fill: true,
      areas: [{
        name: 'nav',
        start: [0, 0],
        end: [0, 0]
      }, {
        name: 'main',
        start: [1, 0],
        end: [1, 0]
      }],
      columns: ['small', 'flex'],
      rows: ['flex'],
      gap: "small"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      gridArea: "nav",
      background: "brand"
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      gridArea: "main",
      background: "brand"
    }))
    // </Grommet>
  );
};

Percentages.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Layout/Grid/Percentages'
};