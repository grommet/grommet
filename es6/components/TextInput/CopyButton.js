function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useContext } from 'react';
import styled from 'styled-components';
import { Copy } from 'grommet-icons/icons/Copy';
import { Button } from '../Button';
import { Tip } from '../Tip';
import { edgeStyle } from '../../utils/styles';
import { useThemeValue } from '../../utils/useThemeValue';
import { MessageContext } from '../../contexts/MessageContext';

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
  var _theme$textInput, _theme$global$input$p, _theme$global$input$p2, _theme$global$input$p3;
  var ariaLabel = _ref.ariaLabel,
    authoredType = _ref.authoredType,
    disabled = _ref.disabled,
    messages = _ref.messages,
    onCopy = _ref.onCopy,
    onBlurCopy = _ref.onBlurCopy,
    tip = _ref.tip,
    value = _ref.value;
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;
  var _useContext = useContext(MessageContext),
    format = _useContext.format;
  var CopyIcon = ((_theme$textInput = theme.textInput) == null || (_theme$textInput = _theme$textInput.icons) == null ? void 0 : _theme$textInput.copy) || Copy;
  // never expose the masked value via the accessible name
  var buttonAriaLabel = ariaLabel || ((authoredType == null ? void 0 : authoredType.toLowerCase()) !== 'password' && (value || value === 0) ? format({
    id: 'input.readOnlyCopy.promptWithValue',
    messages: messages,
    values: {
      value: value
    }
  }) : format({
    id: 'input.readOnlyCopy.prompt',
    messages: messages
  }));
  return /*#__PURE__*/React.createElement(Tip, {
    dropProps: {
      align: {
        bottom: 'top'
      }
    },
    content: tip
  }, /*#__PURE__*/React.createElement(StyledButton, _extends({
    disabled: disabled,
    onClick: onCopy,
    icon: /*#__PURE__*/React.createElement(CopyIcon, null),
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
    "aria-label": buttonAriaLabel
  }, passThemeFlag)));
};