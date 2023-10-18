"use strict";

exports.__esModule = true;
exports["default"] = exports.NColumnGrid = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var NColumnGrid = exports.NColumnGrid = function NColumnGrid() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Grid, {
      columns: {
        count: 6,
        size: 'auto'
      },
      gap: "small"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      background: "brand"
    }, "Item 1"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      background: "brand"
    }, "Item 2"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      background: "brand"
    }, "Item 3"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      background: "brand"
    }, "Item 4"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      background: "brand"
    }, "Item 5"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      background: "brand"
    }, "Item 6"))
    // </Grommet>
  );
};

NColumnGrid.storyName = 'N-column layout';
NColumnGrid.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Layout/Grid/N-column layout'
};