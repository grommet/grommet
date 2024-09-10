"use strict";

exports.__esModule = true;
exports.CopyButton = void 0;
var _react = _interopRequireDefault(require("react"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _Copy = require("grommet-icons/icons/Copy");
var _Button = require("../Button");
var _Tip = require("../Tip");
var _styles = require("../../utils/styles");
var _useThemeValue2 = require("../../utils/useThemeValue");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// to overcome `plain` styling due to (icon && !label) condition
// in buttons without theme.button.default, apply the padding here
var StyledButton = (0, _styledComponents["default"])(_Button.Button).withConfig({
  displayName: "CopyButton__StyledButton",
  componentId: "sc-1bp1m18-0"
})(["border-radius:", ";", ""], function (props) {
  return props.theme.global.control.border.radius;
}, function (props) {
  return !props.theme.button["default"] ? (0, _styles.edgeStyle)('padding', props.pad, false, undefined, props.theme) : '';
});
var CopyButton = exports.CopyButton = function CopyButton(_ref) {
  var _theme$global$input$p, _theme$global$input$p2, _theme$global$input$p3;
  var onClickCopy = _ref.onClickCopy,
    onBlurCopy = _ref.onBlurCopy,
    readOnlyCopyPrompt = _ref.readOnlyCopyPrompt,
    tip = _ref.tip,
    value = _ref.value;
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;
  return /*#__PURE__*/_react["default"].createElement(_Tip.Tip, {
    dropProps: {
      align: {
        bottom: 'top'
      }
    },
    content: tip
  }, /*#__PURE__*/_react["default"].createElement(StyledButton, _extends({
    onClick: onClickCopy,
    icon: /*#__PURE__*/_react["default"].createElement(_Copy.Copy, null),
    pad: {
      horizontal: (_theme$global$input$p = theme.global.input.padding) == null ? void 0 : _theme$global$input$p.horizontal,
      left: (_theme$global$input$p2 = theme.global.input.padding) == null ? void 0 : _theme$global$input$p2.left,
      right: (_theme$global$input$p3 = theme.global.input.padding) == null ? void 0 : _theme$global$input$p3.right,
      // only apply horizontal padding since button will
      // fill height of input
      top: '0',
      bottom: '0'
    },
    onBlur: onBlurCopy,
    onMouseOut: onBlurCopy,
    "aria-label": readOnlyCopyPrompt + " " + value
  }, passThemeFlag)));
};