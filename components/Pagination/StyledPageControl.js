"use strict";

exports.__esModule = true;
exports.StyledSeparator = exports.StyledContainer = exports.StyledPaginationButton = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Button = require("../Button");

var _Text = require("../Text");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var sizeStyle = function sizeStyle(props) {
  var style = props.theme.pagination.button && props.theme.pagination.button.size && props.theme.pagination.button.size[props.size || 'medium'];
  return style ? {
    content: {
      fontSize: style.font && style.font.size,
      lineHeight: style.font && style.font.height
    },
    container: {
      height: style.height,
      minWidth: style.width
    }
  } : '';
};

var StyledPaginationButton = (0, _styledComponents["default"])(_Button.Button).withConfig({
  displayName: "StyledPageControl__StyledPaginationButton",
  componentId: "sc-1vlfaez-0"
})(["> svg{vertical-align:middle;}", ";"], function (props) {
  return sizeStyle(props).content;
});
exports.StyledPaginationButton = StyledPaginationButton;

var StyledContainer = _styledComponents["default"].div.withConfig({
  displayName: "StyledPageControl__StyledContainer",
  componentId: "sc-1vlfaez-1"
})(["display:flex;align-items:center;justify-content:center;max-width:100%;", ";", ";"], function (props) {
  return sizeStyle(props).container;
}, function (props) {
  return props.theme.pagination.control && props.theme.pagination.control.extend;
});

exports.StyledContainer = StyledContainer;
var StyledSeparator = (0, _styledComponents["default"])(_Text.Text).withConfig({
  displayName: "StyledPageControl__StyledSeparator",
  componentId: "sc-1vlfaez-2"
})(["font-weight:bold;", ";", ";"], function (props) {
  return "font-size: " + (sizeStyle(props).content && sizeStyle(props).content.fontSize);
}, function (props) {
  return "line-height: " + (sizeStyle(props).content && sizeStyle(props).content.lineHeight);
});
exports.StyledSeparator = StyledSeparator;