function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from 'react';
import styled from 'styled-components';
import { Copy } from 'grommet-icons/icons/Copy';
import { Button } from '../Button';
import { Tip } from '../Tip';
import { edgeStyle } from '../../utils/styles';
import { useThemeValue } from '../../utils/useThemeValue';

// to overcome `plain` styling due to (icon && !label) condition
// in buttons without theme.button.default, apply the padding here
var StyledButton = styled(Button).withConfig({
  displayName: "CopyButton__StyledButton",
  componentId: "sc-1bp1m18-0"
})(["border-radius:", ";", ""], function (props) {
  return props.theme.global.control.border.radius;
}, function (props) {
  return !props.theme.button["default"] ? edgeStyle('padding', props.pad, false, undefined, props.theme) : '';
});
export var CopyButton = function CopyButton(_ref) {
  var _theme$global$input$p, _theme$global$input$p2, _theme$global$input$p3;
  var onClickCopy = _ref.onClickCopy,
    onBlurCopy = _ref.onBlurCopy,
    readOnlyCopyPrompt = _ref.readOnlyCopyPrompt,
    tip = _ref.tip,
    value = _ref.value;
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;
  return /*#__PURE__*/React.createElement(Tip, {
    dropProps: {
      align: {
        bottom: 'top'
      }
    },
    content: tip
  }, /*#__PURE__*/React.createElement(StyledButton, _extends({
    onClick: onClickCopy,
    icon: /*#__PURE__*/React.createElement(Copy, null),
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