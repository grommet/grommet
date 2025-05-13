"use strict";

exports.__esModule = true;
exports.SearchBorderBox = void 0;
var _styledComponents = require("styled-components");
var _react = _interopRequireWildcard(require("react"));
var _ = require("../../..");
var _contexts = require("../../../../contexts");
var _utils = require("../../../../utils");
var _excluded = ["children", "searching"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var searchingStyle = (0, _styledComponents.css)(["position:relative;outline:none;box-shadow:none;&:before{content:'';position:absolute;bottom:0;left:0;width:100%;height:2px;background:", ";}&:after{content:'';position:absolute;bottom:0;left:0;width:100%;height:2px;will-change:left,right;background:", ";animation:progress 1.5s cubic-bezier(0.4,0,0.2,1) infinite;transform:translateX(-50%) scaleX(0);}@keyframes progress{0%{transform:translateX(-50%) scaleX(0);}50%{transform:translateX(12.5%) scaleX(0.75);}100%{transform:translateX(50%) scaleX(0);}}"], function (props) {
  return (0, _utils.normalizeColor)('light-2', props.theme);
}, function (props) {
  return (0, _utils.normalizeColor)('brand', props.theme);
});
var defaultStyle = (0, _styledComponents.css)(["position:relative;outline:none;&:after{content:'';position:absolute;bottom:0;left:50%;width:0;height:2px;background:transparent;transition:width 0.2s ease,background 0.2s ease,left 0.2s ease;}", ";"], function (props) {
  return props.focus && "\n    box-shadow: none;\n    &:after {\n      left: 0;\n      width: 100%;\n      background: " + (0, _utils.normalizeColor)('brand', props.theme) + ";\n    }\n  ";
});
var SearchBorderBox = exports.SearchBorderBox = function SearchBorderBox(_ref) {
  var children = _ref.children,
    searching = _ref.searching,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useState = (0, _react.useState)(false),
    focus = _useState[0],
    setFocus = _useState[1];
  var boxBorderTheme = {
    box: {
      extend: searching ? searchingStyle : defaultStyle
    }
  };
  return /*#__PURE__*/_react["default"].createElement(_contexts.ThemeContext.Extend, {
    value: boxBorderTheme
  }, /*#__PURE__*/_react["default"].createElement(_.Box, _extends({
    focus: focus,
    searching: searching,
    onFocus: function onFocus() {
      return setFocus(true);
    },
    onBlur: function onBlur() {
      return setFocus(false);
    }
  }, rest), children));
};