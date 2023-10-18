"use strict";

exports.__esModule = true;
exports["default"] = exports.Custom = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _themes = require("grommet/themes");
var _utils = require("grommet/utils");
var _grommetIcons = require("grommet-icons");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var customCheckBoxTheme = {
  checkBox: {
    border: {
      color: {
        light: 'accent-2'
      },
      // width: 'xsmall',
      radius: '2px'
    },
    check: {
      extend: function extend(_ref) {
        var theme = _ref.theme,
          checked = _ref.checked;
        return "\n        " + (checked && "background-color: " + (0, _utils.normalizeColor)('neutral-1', theme) + ";") + "\n        ";
      }
    },
    color: {
      light: 'neutral-3',
      dark: 'neutral-3'
    },
    gap: 'xsmall',
    hover: {
      border: {
        color: undefined
      }
    },
    icon: {
      size: '18px',
      extend: 'stroke: white;'
    },
    icons: {
      checked: _grommetIcons.FormCheckmark
    },
    size: '18px',
    extend: "\n      color: #9C9C9C;\n    "
  }
};
var Custom = exports.Custom = function Custom(props) {
  var _useState = (0, _react.useState)(false),
    checked = _useState[0],
    setChecked = _useState[1];
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: (0, _utils.deepMerge)(_themes.grommet, customCheckBoxTheme)
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.CheckBox, _extends({}, props, {
    label: "Choice",
    checked: checked,
    onChange: function onChange(event) {
      return setChecked(event.target.checked);
    }
  }))));
};
var _default = exports["default"] = {
  title: 'Input/CheckBox/Custom Themed/Custom'
};