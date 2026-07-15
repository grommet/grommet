"use strict";

exports.__esModule = true;
exports.StyledParagraph = void 0;
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _utils = require("../../utils");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
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
var maxlinesStyle = function maxlinesStyle(props) {
  return props.maxLines && (0, _styledComponents.css)(["display:-webkit-box;-webkit-line-clamp:", ";-webkit-box-orient:vertical;overflow:hidden;"], props.maxLines);
};
var StyledParagraph = exports.StyledParagraph = _styledComponents["default"].p.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledParagraph",
  componentId: "sc-tbetod-0"
})(["", " ", " ", " ", " ", " ", " ", ""], _utils.genericStyles, function (props) {
  return maxlinesStyle(props);
}, function (props) {
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