"use strict";

exports.__esModule = true;
exports.StyledBusyContents = exports.GrowCheckmark = exports.EllipsisAnimation = void 0;
var _react = _interopRequireDefault(require("react"));
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _Checkmark = require("grommet-icons/icons/Checkmark");
var _Box = require("../Box");
var _styles = require("../../utils/styles");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var bounceDelay = (0, _styledComponents.keyframes)(["0%,80%,100%{transform:scale(0.4);}40%{transform:scale(0.8);}"]);
var bounceDelayRule = (0, _styledComponents.css)(["animation:", " 1.4s infinite ease-in-out both;"], bounceDelay);
var Dot = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "BusyAnimation__Dot",
  componentId: "sc-feuivs-0"
})(["background-color:currentColor;width:8px;height:8px;border-radius:100%;display:inline-block;", " ", ""], bounceDelayRule, function (props) {
  return props.delay && "animation-delay: " + props.delay + ";";
});
var EllipsisAnimation = exports.EllipsisAnimation = function EllipsisAnimation() {
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
    gap: "small"
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