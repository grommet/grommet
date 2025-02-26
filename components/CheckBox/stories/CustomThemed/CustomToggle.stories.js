"use strict";

exports.__esModule = true;
exports["default"] = exports.CustomToggle = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = require("styled-components");
var _grommet = require("grommet");
var _themes = require("grommet/themes");
var _utils = require("grommet/utils");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var checkboxCheckStyle = (0, _styledComponents.css)(["background-color:#2196f3;border-color:#2196f3;"]);
var customToggleTheme = {
  global: {
    colors: {
      'toggle-bg': '#757575',
      'toggle-knob': 'white',
      'toggle-accent': 'accent-2'
    }
  },
  checkBox: {
    border: {
      color: {
        light: 'toggle-bg'
      }
    },
    color: {
      light: 'toggle-knob'
    },
    check: {
      radius: '2px'
    },
    hover: {
      border: {
        color: undefined
      }
    },
    toggle: {
      background: {
        light: 'toggle-accent'
      },
      color: {
        light: 'toggle-knob'
      },
      size: '36px',
      knob: {
        extend: "\n          top: -4px;\n          box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.12),\n           0px 2px 2px 0px rgba(0,0,0,0.24);\n        "
      },
      extend: function extend(_ref) {
        var checked = _ref.checked;
        return "\n        height: 14px;\n        " + (checked && checkboxCheckStyle) + "\n      ";
      }
    },
    gap: 'xsmall',
    size: '18px'
  }
};
var CustomToggle = exports.CustomToggle = function CustomToggle(props) {
  var _useState = (0, _react.useState)(false),
    checked = _useState[0],
    setChecked = _useState[1];
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: (0, _utils.deepMerge)(_themes.grommet, customToggleTheme)
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.CheckBox, _extends({}, props, {
    label: "Choice",
    checked: checked,
    onChange: function onChange(event) {
      return setChecked(event.target.checked);
    },
    toggle: true
  }))));
};
CustomToggle.storyName = 'Custom toggle';
var _default = exports["default"] = {
  title: 'Input/CheckBox/Custom Themed/Custom toggle'
};