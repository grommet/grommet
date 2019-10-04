function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { cloneElement, Children, useState } from 'react';
import { compose } from 'recompose';
import { withTheme } from 'styled-components';
import { colorIsDark, normalizeBackground, normalizeColor } from '../../utils';
import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { withFocus, withForwardRef } from '../hocs';
import { StyledButton } from './StyledButton';

var Button = function Button(_ref) {
  var a11yTitle = _ref.a11yTitle,
      color = _ref.color,
      forwardRef = _ref.forwardRef,
      children = _ref.children,
      disabled = _ref.disabled,
      icon = _ref.icon,
      gap = _ref.gap,
      fill = _ref.fill,
      focus = _ref.focus,
      href = _ref.href,
      label = _ref.label,
      onClick = _ref.onClick,
      onMouseOut = _ref.onMouseOut,
      onMouseOver = _ref.onMouseOver,
      plain = _ref.plain,
      primary = _ref.primary,
      reverse = _ref.reverse,
      theme = _ref.theme,
      type = _ref.type,
      as = _ref.as,
      rest = _objectWithoutPropertiesLoose(_ref, ["a11yTitle", "color", "forwardRef", "children", "disabled", "icon", "gap", "fill", "focus", "href", "label", "onClick", "onMouseOut", "onMouseOver", "plain", "primary", "reverse", "theme", "type", "as"]);

  if ((icon || label) && children) {
    console.warn('Button should not have children if icon or label is provided');
  }

  var isDarkBackground = function isDarkBackground() {
    var backgroundColor = normalizeBackground(normalizeColor(color || theme.button.primary.color || theme.global.colors.control || 'brand', theme), theme);
    return colorIsDark(backgroundColor, theme);
  };

  var _useState = useState(false),
      hover = _useState[0],
      setHover = _useState[1];

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
  } // the key events are covered by withFocus()

  /* eslint-disable jsx-a11y/mouse-events-have-key-events */


  return React.createElement(StyledButton, _extends({}, rest, {
    as: domTag,
    ref: forwardRef,
    "aria-label": a11yTitle,
    colorValue: color,
    disabled: disabled,
    hasIcon: !!icon,
    gap: gap,
    hasLabel: !!label,
    fillContainer: fill,
    focus: focus,
    href: href,
    onClick: onClick,
    onMouseOver: onMouseOverButton,
    onMouseOut: onMouseOutButton,
    pad: !plain,
    plain: typeof plain !== 'undefined' ? plain : Children.count(children) > 0 || icon && !label,
    primary: primary,
    type: !href ? type : undefined
  }), contents);
};

Button.defaultProps = {
  type: 'button',
  focusIndicator: true,
  gap: 'small'
};
Object.setPrototypeOf(Button.defaultProps, defaultProps);
var ButtonDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  ButtonDoc = require('./doc').doc(Button);
}

var ButtonWrapper = compose(withFocus(), withTheme, withForwardRef)(ButtonDoc || Button);
export { ButtonWrapper as Button };