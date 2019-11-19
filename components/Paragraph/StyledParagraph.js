"use strict";

exports.__esModule = true;
exports.StyledParagraph = void 0;

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _utils = require("../../utils");

var _defaultProps = require("../../default-props");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var colorStyle = (0, _styledComponents.css)(["color:", ";"], function (props) {
  return (0, _utils.normalizeColor)(props.colorProp, props.theme);
});

var sizeStyle = function sizeStyle(props) {
  var size = props.size || 'medium';
  var data = props.theme.paragraph[size];
  return (0, _styledComponents.css)(["font-size:", ";line-height:", ";max-width:", ";"], data.size, data.height, props.fillProp ? 'none' : data.maxWidth);
};

var TEXT_ALIGN_MAP = {
  center: 'center',
  end: 'right',
  start: 'left'
};
var textAlignStyle = (0, _styledComponents.css)(["text-align:", ";"], function (props) {
  return TEXT_ALIGN_MAP[props.textAlign];
});

var StyledParagraph = _styledComponents["default"].p.withConfig({
  displayName: "StyledParagraph",
  componentId: "tbetod-0"
})(["", " ", " ", " ", " ", ""], _utils.genericStyles, function (props) {
  return sizeStyle(props);
}, function (props) {
  return props.textAlign && textAlignStyle;
}, function (props) {
  return props.colorProp && colorStyle;
}, function (props) {
  return props.theme.paragraph && props.theme.paragraph.extend;
});

exports.StyledParagraph = StyledParagraph;
StyledParagraph.defaultProps = {};
Object.setPrototypeOf(StyledParagraph.defaultProps, _defaultProps.defaultProps);