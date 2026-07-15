"use strict";

exports.__esModule = true;
exports.StyledHeading = void 0;
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _utils = require("../../utils");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var sizeStyle = function sizeStyle(props) {
  // size is a combination of the level and size properties
  var size = props.size || 'medium';
  var headingTheme = props.theme.heading;
  var levelStyle = headingTheme.level[props.level];
  if (levelStyle) {
    var data = levelStyle[size];
    var styles = [(0, _styledComponents.css)(["font-size:", ";line-height:", ";max-width:", ";font-weight:", ";overflow-wrap:", ";"], data ? data.size : size, data ? data.height : 'normal', props.fillProp && 'none' || data && data.maxWidth || levelStyle.medium.maxWidth, props.weight || levelStyle.font.weight || headingTheme.weight, props.overflowWrap)];
    if (props.responsive && headingTheme.responsiveBreakpoint) {
      var breakpoint = props.theme.global.breakpoints[headingTheme.responsiveBreakpoint];
      if (breakpoint) {
        var responsiveData = headingTheme.level[props.level + 1] ? headingTheme.level[props.level + 1][size] : headingTheme.level[props.level][size];
        if (responsiveData) {
          styles.push((0, _utils.breakpointStyle)(breakpoint, "\n            font-size: " + responsiveData.size + ";\n            line-height: " + responsiveData.height + ";\n            max-width: " + (props.fillProp && 'none' || responsiveData.maxWidth) + ";\n          ", props.responsive));
        }
      }
    }
    return styles;
  }
  console.warn("Heading level " + props.level + " is not defined in your theme.");
  return '';
};
var fontFamily = function fontFamily(props) {
  var _ref = props.theme.heading.level[props.level] || {},
    font = _ref.font;
  if (font && font.family) {
    return (0, _styledComponents.css)(["font-family:", ";"], font.family);
  }
  return props.theme.heading.font ? (0, _styledComponents.css)(["font-family:", ";"], props.theme.heading.font.family) : '';
};
var truncateStyle = "\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n";
var colorStyle = (0, _styledComponents.css)(["color:", ";"], function (props) {
  return (0, _utils.normalizeColor)(props.colorProp || props.theme.heading.color, props.theme);
});
var StyledHeading = exports.StyledHeading = _styledComponents["default"].h1.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledHeading",
  componentId: "sc-1rdh4aw-0"
})(["", " ", " ", " ", " ", " ", " ", ""], _utils.genericStyles, function (props) {
  return fontFamily(props);
}, function (props) {
  return sizeStyle(props);
}, function (props) {
  return props.textAlign && _utils.textAlignStyle;
}, function (props) {
  return props.truncate && truncateStyle;
}, function (props) {
  return (props.colorProp || props.theme.heading.color) && colorStyle;
}, function (props) {
  return props.theme.heading && props.theme.heading.extend;
});