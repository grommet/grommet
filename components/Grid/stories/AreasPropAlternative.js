"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var GridAreasAlternative = function GridAreasAlternative() {
  return _react["default"].createElement(_grommet.Grommet, {
    full: true,
    theme: _themes.grommet
  }, _react["default"].createElement(_grommet.Grid, {
    rows: ['xxsmall', 'medium', 'xsmall'],
    columns: ['1/4', '3/4'],
    areas: [['header', 'header'], ['sidebar', 'main'], ['footer', 'footer']],
    gap: "small"
  }, _react["default"].createElement(_grommet.Box, {
    background: "brand",
    gridArea: "header"
  }, "Header"), _react["default"].createElement(_grommet.Box, {
    background: "light-5",
    gridArea: "sidebar"
  }, "Sidebar"), _react["default"].createElement(_grommet.Box, {
    background: "light-2",
    gridArea: "main"
  }, "Main"), _react["default"].createElement(_grommet.Box, {
    background: "dark-2",
    gridArea: "footer"
  }, "Footer")));
};

(0, _react2.storiesOf)('Grid', module).add('Areas prop alternative', function () {
  return _react["default"].createElement(GridAreasAlternative, null);
});