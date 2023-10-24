"use strict";

exports.__esModule = true;
exports.StyledSeparator = exports.StyledPaginationButton = exports.StyledContainer = void 0;
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _styles = require("../../utils/styles");
var _Button = require("../Button");
var _Text = require("../Text");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var sizeStyle = function sizeStyle(props) {
  var style = props.theme.pagination.button && props.theme.pagination.button.size && props.theme.pagination.button.size[props.size || 'medium'];
  return style ? {
    content: {
      fontSize: style.font && style.font.size,
      // fix for safari, apply line-height 0 on next/previous
      // icon-only buttons
      lineHeight: style.font && props.hasLabel ? style.font.height : 0
    },
    container: {
      height: style.height,
      minWidth: style.width
    }
  } : '';
};
var StyledPaginationButton = exports.StyledPaginationButton = (0, _styledComponents["default"])(_Button.Button).withConfig({
  displayName: "StyledPageControl__StyledPaginationButton",
  componentId: "sc-1vlfaez-0"
})(["> svg{margin:0 auto;}", ";"], function (props) {
  return sizeStyle(props).content;
});
var StyledContainer = exports.StyledContainer = _styledComponents["default"].div.withConfig(_styles.styledComponentsConfig).withConfig({
  displayName: "StyledPageControl__StyledContainer",
  componentId: "sc-1vlfaez-1"
})(["display:flex;align-items:center;justify-content:center;max-width:100%;", ";", ";"], function (props) {
  return sizeStyle(props).container;
}, function (props) {
  return props.theme.pagination.control && props.theme.pagination.control.extend;
});
var StyledSeparator = exports.StyledSeparator = (0, _styledComponents["default"])(_Text.Text).withConfig({
  displayName: "StyledPageControl__StyledSeparator",
  componentId: "sc-1vlfaez-2"
})(["font-weight:bold;", ";", ";"], function (props) {
  return "font-size: " + (sizeStyle(props).content && sizeStyle(props).content.fontSize);
}, function (props) {
  return "line-height: " + (sizeStyle(props).content && sizeStyle(props).content.lineHeight);
});