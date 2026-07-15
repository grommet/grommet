"use strict";

exports.__esModule = true;
exports.StyledDrop = void 0;
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _Box = require("../Box");
var _styles = require("../../utils/styles");
var _background = require("../../utils/background");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function getTransformOriginStyle(align) {
  var vertical = 'top';
  if (align.bottom) {
    vertical = 'bottom';
  }
  var horizontal = 'left';
  if (align.right) {
    horizontal = 'right';
  }
  return vertical + " " + horizontal;
}
var dropKeyFrames = (0, _styledComponents.keyframes)(["0%{opacity:0.5;transform:scale(0.8);}100%{opacity:1;transform:scale(1);}"]);

// The desired margin may be adjusted depending on drops alignment
var marginStyle = function marginStyle(theme, align, data, responsive, marginProp) {
  // NOTE: If marginProp is passed, it overrides the alignment-aware
  //  margin logic and uses the provided value instead.
  var margin = theme.global.edgeSize[data] || data;
  var adjustedMargin = {};
  // if user provides CSS string such as '50px 12px', apply that always
  var customCSS = typeof margin === 'string' && margin.split(' ').length > 1;
  if (theme.global.drop.intelligentMargin === true && !customCSS && typeof margin === 'string') {
    if (align.top === 'bottom') adjustedMargin.top = margin;else if (align.bottom === 'top') adjustedMargin.bottom = margin;
    if (align.right === 'left') adjustedMargin.left = "-" + margin;else if (align.left === 'right') adjustedMargin.left = margin;
    if (!Object.keys(adjustedMargin)) adjustedMargin = 'none';
  } else {
    return (0, _styles.edgeStyle)('margin', marginProp || theme.global.drop.margin, responsive, theme.global.edgeSize.responsiveBreakpoint, theme);
  }
  return (0, _styles.edgeStyle)('margin', marginProp || adjustedMargin, responsive, theme.global.edgeSize.responsiveBreakpoint, theme);
};
var StyledDrop = exports.StyledDrop = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "StyledDrop",
  componentId: "sc-16s5rx8-0"
})(["", " ", " position:fixed;z-index:", ";outline:none;", " ", " opacity:0;transform-origin:", ";animation:", " 0.1s forwards;animation-delay:0.01s;@media screen and (-ms-high-contrast:active),(-ms-high-contrast:none){display:flex;align-items:stretch;}", ""], _styles.baseStyle, function (props) {
  return !props.plain && (props.round && (0, _styles.roundStyle)(props.round, props.responsive || true, props.theme) || "border-radius: " + props.theme.global.drop.border.radius + ";");
}, function (props) {
  return props.theme.global.drop.zIndex;
}, function (props) {
  return !props.plain && (0, _background.backgroundStyle)(props.background || props.theme.global.drop.background, props.theme);
}, function (props) {
  return !props.plain && (props.margin || props.theme.global.drop.margin) && props.theme.global && marginStyle(props.theme, props.alignProp, props.theme.global.drop.margin, props.responsive, props.margin);
}, function (props) {
  return getTransformOriginStyle(props.alignProp);
}, dropKeyFrames, function (props) {
  return props.theme.global.drop && props.theme.global.drop.extend;
});