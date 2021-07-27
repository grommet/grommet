"use strict";

exports.__esModule = true;
exports.StyledParagraph = void 0;

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _utils = require("../../utils");

var _defaultProps = require("../../default-props");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var colorStyle = (0, _styledComponents.css)(["color:", ";"], function (props) {
  return (0, _utils.normalizeColor)(props.colorProp, props.theme);
});

var sizeStyle = function sizeStyle(props) {
  var size = props.size || 'medium';
  var data = props.theme.paragraph[size];
  return (0, _styledComponents.css)(["font-size:", ";line-height:", ";max-width:", ";"], data ? data.size : size, data ? data.height : 'normal', props.fillProp ? 'none' : data && data.maxWidth);
};

var fontFamily = (0, _styledComponents.css)(["font-family:", ";"], function (props) {
  return props.theme.paragraph.font.family;
});

var StyledParagraph = _styledComponents["default"].p.withConfig({
  displayName: "StyledParagraph",
  componentId: "tbetod-0"
})(["", " ", " ", " ", " ", " ", ""], _utils.genericStyles, function (props) {
  return sizeStyle(props);
}, function (props) {
  return props.textAlign && _utils.textAlignStyle;
}, function (props) {
  return props.colorProp && colorStyle;
}, function (props) {
  return props.theme.paragraph.font && props.theme.paragraph.font.family && fontFamily;
}, function (props) {
  return props.theme.paragraph && props.theme.paragraph.extend;
});

exports.StyledParagraph = StyledParagraph;
StyledParagraph.defaultProps = {};
Object.setPrototypeOf(StyledParagraph.defaultProps, _defaultProps.defaultProps);