"use strict";

exports.__esModule = true;
exports.StyledAnchor = void 0;

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _utils = require("../../utils");

var _defaultProps = require("../../default-props");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var disabledStyle = "\n  opacity: 0.3;\n  cursor: default;\n  text-decoration: none;\n";

var sizeStyle = function sizeStyle(props) {
  if (props.size) {
    var size = props.size || 'medium';
    var data = props.theme.text[size];
    return (0, _styledComponents.css)(["font-size:", ";line-height:", ";"], data.size, data.height);
  }

  return (0, _styledComponents.css)(["font-size:inherit;line-height:inherit;"]);
};

var StyledAnchor = _styledComponents.default.a.withConfig({
  displayName: "StyledAnchor",
  componentId: "sc-1rp7lwl-0"
})(["box-sizing:border-box;", " color:", ";", " text-decoration:", ";cursor:pointer;outline:none;", " ", " ", " ", " ", " ", ""], function (props) {
  return sizeStyle(props);
}, function (props) {
  return (0, _utils.normalizeColor)(props.colorProp || props.theme.anchor.color, props.theme);
}, function (props) {
  return props.theme.anchor.fontWeight && "font-weight: " + props.theme.anchor.fontWeight + ";";
}, function (props) {
  return props.hasIcon ? 'none' : props.theme.anchor.textDecoration;
}, _utils.genericStyles, function (props) {
  return !props.disabled && props.theme.anchor.hover && (0, _styledComponents.css)(["&:hover{", " ", " ", "}"], props.theme.anchor.hover.textDecoration && "text-decoration: " + props.theme.anchor.hover.textDecoration + ";", props.theme.anchor.hover.fontWeight && "font-weight: " + props.theme.anchor.hover.fontWeight + ";", props.theme.anchor.hover.extend);
}, function (props) {
  return props.hasIcon && !props.hasLabel && "\n    padding: " + props.theme.global.edgeSize.small + ";\n  ";
}, function (props) {
  return props.disabled && disabledStyle;
}, function (props) {
  return props.focus && _utils.focusStyle;
}, function (props) {
  return props.theme.anchor.extend;
});

exports.StyledAnchor = StyledAnchor;
StyledAnchor.defaultProps = {};
Object.setPrototypeOf(StyledAnchor.defaultProps, _defaultProps.defaultProps);