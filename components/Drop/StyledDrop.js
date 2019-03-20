"use strict";

exports.__esModule = true;
exports.StyledDrop = void 0;

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _utils = require("../../utils");

var _background = require("../../utils/background");

var _defaultProps = require("../../default-props");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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

var StyledDrop = _styledComponents.default.div.withConfig({
  displayName: "StyledDrop",
  componentId: "sc-16s5rx8-0"
})(["", " border-radius:", ";position:fixed;z-index:", ";outline:none;", " opacity:0;transform-origin:", ";animation:", " 0.1s forwards;animation-delay:0.01s;@media screen and (-ms-high-contrast:active),(-ms-high-contrast:none){display:flex;align-items:stretch;}", ""], _utils.baseStyle, function (props) {
  return props.theme.global.drop.border.radius;
}, function (props) {
  return props.theme.global.drop.zIndex;
}, function (props) {
  return !props.plain && (0, _background.backgroundStyle)(props.theme.global.drop.background, props.theme);
}, function (props) {
  return getTransformOriginStyle(props.alignProp);
}, dropKeyFrames, function (props) {
  return props.theme.global.drop && props.theme.global.drop.extend;
});

exports.StyledDrop = StyledDrop;
StyledDrop.defaultProps = {};
Object.setPrototypeOf(StyledDrop.defaultProps, _defaultProps.defaultProps);