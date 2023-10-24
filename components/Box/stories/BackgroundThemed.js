"use strict";

exports.__esModule = true;
exports["default"] = exports.BackgroundThemed = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _Grid = require("../../Grid");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var BackgroundThemed = exports.BackgroundThemed = function BackgroundThemed() {
  var theme = (0, _react.useContext)(_grommet.ThemeContext);
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