"use strict";

exports.__esModule = true;
exports["default"] = exports.GridAreasAlternative = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var GridAreasAlternative = exports.GridAreasAlternative = function GridAreasAlternative() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Grid, {
      rows: ['xxsmall', 'medium', 'xsmall'],
      columns: ['1/4', '3/4'],
      areas: [['header', 'header'], ['sidebar', 'main'], ['footer', 'footer']],
      gap: "small"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      background: "brand",
      gridArea: "header"
    }, "Header"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      background: "light-5",
      gridArea: "sidebar"
    }, "Sidebar"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      background: "light-2",
      gridArea: "main"
    }, "Main"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      background: "dark-2",
      gridArea: "footer"
    }, "Footer"))
    // </Grommet>
  );
};

GridAreasAlternative.args = {
  full: true
};
GridAreasAlternative.storyName = 'Areas prop alternatives';
var _default = exports["default"] = {
  title: 'Layout/Grid/Areas prop alternatives'
};