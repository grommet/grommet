"use strict";

exports.__esModule = true;
exports.StyledBusyContents = exports.GrowCheckmark = exports.EllipsisAnimation = void 0;
var _react = _interopRequireDefault(require("react"));
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _Checkmark = require("grommet-icons/icons/Checkmark");
var _Box = require("../Box");
var _styles = require("../../utils/styles");
var _useThemeValue2 = require("../../utils/useThemeValue");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var bounceDelay = (0, _styledComponents.keyframes)(["0%,80%,100%{transform:scale(0.4);}40%{transform:scale(0.8);}"]);
var bounceDelayRule = (0, _styledComponents.css)(["animation:", " 1.4s infinite ease-in-out both;"], bounceDelay);
var Dot = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "BusyAnimation__Dot",
  componentId: "sc-feuivs-0"
})(["background-color:currentColor;width:8px;height:8px;border-radius:100%;display:inline-block;", " ", ""], bounceDelayRule, function (props) {
  return props.delay && "animation-delay: " + props.delay + ";";
});
var EllipsisAnimation = exports.EllipsisAnimation = function EllipsisAnimation() {
  var _theme$button;
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme;
  return /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    style: {
      position: 'absolute'
    },
    fill: true,
    alignContent: "center",
    justify: "center"
  }, /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    alignSelf: "center",
    direction: "row",
    gap: (_theme$button = theme.button) == null || (_theme$button = _theme$button.busy) == null ? void 0 : _theme$button.gap
  }, /*#__PURE__*/_react["default"].createElement(Dot, {
    delay: "-0.32s"
  }), /*#__PURE__*/_react["default"].createElement(Dot, {
    delay: "-0.16s"
  }), /*#__PURE__*/_react["default"].createElement(Dot, null)));
};
var grow = (0, _styledComponents.keyframes)(["0%{opacity:0;transform:scale(.3);}20%{opacity:1;transform:scale(1.15);}30%{transform:scale(.9);}45%{transform:scale(1.05);}55%{transform:scale(1);}100%{transform:scale(1);}"]);
var GrowCheckmark = exports.GrowCheckmark = (0, _styledComponents["default"])(_Checkmark.Checkmark).withConfig({
  displayName: "BusyAnimation__GrowCheckmark",
  componentId: "sc-feuivs-1"
})(["position:absolute;align-self:center;animation:", " 0.9s ease-in-out;"], grow);
var StyledBusyContents = exports.StyledBusyContents = _styledComponents["default"].div.withConfig(_styles.styledComponentsConfig).withConfig({
  displayName: "BusyAnimation__StyledBusyContents",
  componentId: "sc-feuivs-2"
})(["opacity:", ";}"], function (props) {
  return props.animating ? 0 : 1;
});