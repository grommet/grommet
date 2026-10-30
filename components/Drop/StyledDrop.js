"use strict";

exports.__esModule = true;
exports.StyledDrop = void 0;
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _Box = require("../Box");
var _styles = require("../../utils/styles");
var _background = require("../../utils/background");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

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