"use strict";

exports.__esModule = true;
exports["default"] = exports.GlobalThemeWithThemeContext = void 0;
var _react = _interopRequireWildcard(require("react"));
var _themes = require("grommet/themes");
var _utils = require("grommet/utils");
var _grommet = require("grommet");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var customTheme = (0, _utils.deepMerge)(_themes.grommet, {
  global: {
    focus: {
      border: {
        color: 'red'
      },
      shadow: {
        color: 'red'
      }
    }
  }
});
var GlobalThemeWithThemeContext = exports.GlobalThemeWithThemeContext = function GlobalThemeWithThemeContext() {
  var options = ['one', 'two', 'three'];
  var _useState = (0, _react.useState)(''),
    valueRed = _useState[0],
    setValueRed = _useState[1];
  var _useState2 = (0, _react.useState)(''),
    valueBlue = _useState2[0],
    setValueBlue = _useState2[1];
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: customTheme
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large",
    direction: "column",
    gap: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    margin: "medium"
  }, "The focus color of this select component is being altered by the custom theme that is passed into the Grommet component."), /*#__PURE__*/_react["default"].createElement(_grommet.Select, {
    alignSelf: "center",
    placeholder: "Select",
    value: valueRed,
    options: options,
    onChange: function onChange(_ref) {
      var option = _ref.option;
      return setValueRed(option);
    }
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommet.ThemeContext.Extend, {
    value: {
      global: {
        focus: {
          border: {
            color: 'blue'
          }
        }
      }
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    margin: "medium"
  }, "The focus color of this select component is being altered by ThemeContext, independent from the custom theme"), /*#__PURE__*/_react["default"].createElement(_grommet.Select, {
    alignSelf: "center",
    placeholder: "Select",
    value: valueBlue,
    options: options,
    onChange: function onChange(_ref2) {
      var option = _ref2.option;
      return setValueBlue(option);
    }
  })))));
};
GlobalThemeWithThemeContext.storyName = 'Extend';
var _default = exports["default"] = {
  title: 'Utilities/ThemeContext/Extend'
};