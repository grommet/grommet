function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { cloneElement, Children, forwardRef, useContext, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { colorIsDark, normalizeBackground, normalizeColor } from '../../utils';
import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { StyledButton } from './StyledButton';
var Button = forwardRef(function (_ref, ref) {
  var a11yTitle = _ref.a11yTitle,
      color = _ref.color,
      children = _ref.children,
      disabled = _ref.disabled,
      icon = _ref.icon,
      _ref$focusIndicator = _ref.focusIndicator,
      focusIndicator = _ref$focusIndicator === void 0 ? true : _ref$focusIndicator,
      _ref$gap = _ref.gap,
      gap = _ref$gap === void 0 ? 'small' : _ref$gap,
      fill = _ref.fill,
      href = _ref.href,
      label = _ref.label,
      _onBlur = _ref.onBlur,
      onClick = _ref.onClick,
      _onFocus = _ref.onFocus,
      onMouseOut = _ref.onMouseOut,
      onMouseOver = _ref.onMouseOver,
      plain = _ref.plain,
      primary = _ref.primary,
      reverse = _ref.reverse,
      size = _ref.size,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'button' : _ref$type,
      as = _ref.as,
      rest = _objectWithoutPropertiesLoose(_ref, ["a11yTitle", "color", "children", "disabled", "icon", "focusIndicator", "gap", "fill", "href", "label", "onBlur", "onClick", "onFocus", "onMouseOut", "onMouseOver", "plain", "primary", "reverse", "size", "type", "as"]);

  var theme = useContext(ThemeContext) || defaultProps.theme;

  var _useState = useState(),
      focus = _useState[0],
      setFocus = _useState[1];

  if ((icon || label) && children) {
    console.warn('Button should not have children if icon or label is provided');
  }

  var isDarkBackground = function isDarkBackground() {
    var backgroundColor = normalizeBackground(normalizeColor(color || theme.button.primary.color || theme.global.colors.control || 'brand', theme), theme);
    return colorIsDark(backgroundColor, theme);
  };

  var _useState2 = useState(false),
      hover = _useState2[0],
      setHover = _useState2[1];

  var onMouseOverButton = function onMouseOverButton(event) {
    setHover(true);

    if (onMouseOver) {
      onMouseOver(event);
    }
  };

  var onMouseOutButton = function onMouseOutButton(event) {
    setHover(false);

    if (onMouseOut) {
      onMouseOut(event);
    }
  };

  var buttonIcon = icon; // only change color if user did not specify the color themselves...

  if (primary && icon && !icon.props.color) {
    buttonIcon = cloneElement(icon, {
      color: theme.global.colors.text[isDarkBackground() ? 'dark' : 'light']
    });
  }

  var domTag = !as && href ? 'a' : as;
  var first = reverse ? label : buttonIcon;
  var second = reverse ? buttonIcon : label;
  var contents;

  if (first && second) {
    contents = React.createElement(Box, {
      direction: "row",
      align: "center",
      justify: "center",
      gap: gap
    }, first, second);
  } else if (typeof children === 'function') {
    contents = children({
      hover: hover,
      focus: focus
    });
  } else {
    contents = first || second || children;
  }

  return React.createElement(StyledButton, _extends({}, rest, {
    as: domTag,
    ref: ref,
    "aria-label": a11yTitle,
    colorValue: color,
    disabled: disabled,
    hasIcon: !!icon,
    gap: gap,
    hasLabel: !!label,
    fillContainer: fill,
    focus: focus,
    focusIndicator: focusIndicator,
    href: href,
    onClick: onClick,
    onFocus: function onFocus(event) {
      setFocus(true);
      if (_onFocus) _onFocus(event);
    },
    onBlur: function onBlur(event) {
      setFocus(false);
      if (_onBlur) _onBlur(event);
    },
    onMouseOver: onMouseOverButton,
    onMouseOut: onMouseOutButton,
    pad: !plain,
    plain: typeof plain !== 'undefined' ? plain : Children.count(children) > 0 || icon && !label,
    primary: primary,
    sizeProp: size,
    type: !href ? type : undefined
  }), contents);
});
Button.displayName = 'Button';
var ButtonDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  ButtonDoc = require('./doc').doc(Button);
}

var ButtonWrapper = ButtonDoc || Button;
export { ButtonWrapper as Button };