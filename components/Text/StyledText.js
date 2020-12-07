"use strict";

exports.__esModule = true;
exports.StyledText = void 0;

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _utils = require("../../utils");

var _defaultProps = require("../../default-props");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var sizeStyle = function sizeStyle(props) {
  var size = props.size || 'medium';
  var data = props.theme.text[size];

  if (data) {
    return (0, _styledComponents.css)(["font-size:", ";line-height:", ";"], data.size, data.height);
  }

  return (0, _styledComponents.css)(["font-size:", ";line-height:normal;"], size);
};

var truncateStyle = "\n  white-space: nowrap;\n  max-width: 100%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n";
var colorStyle = (0, _styledComponents.css)(["color:", ";"], function (props) {
  return (0, _utils.normalizeColor)(props.colorProp, props.theme);
});
var weightStyle = (0, _styledComponents.css)(["font-weight:", ";"], function (props) {
  return props.weight;
});
var wordBreakStyle = (0, _styledComponents.css)(["word-break:", ";"], function (props) {
  return props.wordBreak;
});
var fontFamily = (0, _styledComponents.css)(["font-family:", ";"], function (props) {
  return props.theme.text.font.family;
});
var StyledText = (0, _styledComponents["default"])('span').withConfig({
  shouldForwardProp: function shouldForwardProp(prop, defaultValidatorFn) {
    return defaultValidatorFn(prop) && prop !== 'size';
  }
}).withConfig({
  displayName: "StyledText",
  componentId: "sc-1sadyjn-0"
})(["", " ", " ", " ", " ", " ", " ", " ", " ", ""], _utils.genericStyles, function (props) {
  return sizeStyle(props);
}, function (props) {
  return props.textAlign && _utils.textAlignStyle;
}, function (props) {
  return props.truncate && truncateStyle;
}, function (props) {
  return props.colorProp && colorStyle;
}, function (props) {
  return props.weight && weightStyle;
}, function (props) {
  return props.wordBreak && wordBreakStyle;
}, function (props) {
  return props.theme.text.font && props.theme.text.font.family && fontFamily;
}, function (props) {
  return props.theme.text && props.theme.text.extend;
});
exports.StyledText = StyledText;
StyledText.defaultProps = {};
Object.setPrototypeOf(StyledText.defaultProps, _defaultProps.defaultProps);