"use strict";

exports.__esModule = true;
exports.StyledDrop = void 0;

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _styles = require("../../utils/styles");

var _background = require("../../utils/background");

var _defaultProps = require("../../default-props");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var StyledDrop = _styledComponents["default"].div.withConfig({
  displayName: "StyledDrop",
  componentId: "sc-16s5rx8-0"
})(["", " ", " position:fixed;z-index:", ";outline:none;", " ", " opacity:0;transform-origin:", ";animation:", " 0.1s forwards;animation-delay:0.01s;@media screen and (-ms-high-contrast:active),(-ms-high-contrast:none){display:flex;align-items:stretch;}", ""], _styles.baseStyle, function (props) {
  return !props.plain && (props.round && (0, _styles.roundStyle)(props.round, true, props.theme) || "border-radius: " + props.theme.global.drop.border.radius + ";");
}, function (props) {
  return props.theme.global.drop.zIndex;
}, function (props) {
  return !props.plain && (0, _background.backgroundStyle)(props.background || props.theme.global.drop.background, props.theme);
}, function (props) {
  return !props.plain && (props.margin || props.theme.global.drop.margin) && props.theme.global && (0, _styles.edgeStyle)('margin', props.margin || props.theme.global.drop.margin, props.responsive, props.theme.global.edgeSize.responsiveBreakpoint, props.theme);
}, function (props) {
  return getTransformOriginStyle(props.alignProp);
}, dropKeyFrames, function (props) {
  return props.theme.global.drop && props.theme.global.drop.extend;
});

exports.StyledDrop = StyledDrop;
StyledDrop.defaultProps = {};
Object.setPrototypeOf(StyledDrop.defaultProps, _defaultProps.defaultProps);