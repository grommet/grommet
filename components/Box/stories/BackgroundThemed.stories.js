"use strict";

exports.__esModule = true;
exports["default"] = exports.BackgroundThemed = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _Grid = require("../../Grid");
var _useThemeValue2 = require("../../../utils/useThemeValue");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var BackgroundThemed = exports.BackgroundThemed = function BackgroundThemed() {
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme;
  var backgrounds = theme.global.backgrounds;
  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet>
    backgrounds ? /*#__PURE__*/_react["default"].createElement(_Grid.Grid, {
      columns: "small",
      rows: "small",
      gap: "small",
      pad: "large"
    }, Object.entries(backgrounds).map(function (_ref) {
      var key = _ref[0],
        background = _ref[1];
      return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
        key: key,
        background: background,
        fill: true,
        pad: "medium",
        justify: "center",
        round: "small"
      }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
        weight: "bold",
        size: "large"
      }, key));
    })) : /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, {
      size: "large"
    }, "There are no backgrounds defined at `theme.global.backgrounds` for the currently selected theme. Selecting \"grommet\" from the Theme menu above is a good place to start."))
    // </Grommet>
  );
};
BackgroundThemed.storyName = 'Background from theme';
var _default = exports["default"] = {
  title: 'Layout/Box/Background from theme'
};