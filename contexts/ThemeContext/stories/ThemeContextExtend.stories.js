"use strict";

exports.__esModule = true;
exports["default"] = exports.GlobalThemeWithThemeContext = void 0;
var _react = _interopRequireWildcard(require("react"));
var _themes = require("grommet/themes");
var _utils = require("grommet/utils");
var _grommet = require("grommet");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
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