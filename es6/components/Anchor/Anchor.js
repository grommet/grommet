function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { cloneElement, useEffect } from 'react';
import { compose } from 'recompose';
import { withTheme } from 'styled-components';
import { normalizeColor } from '../../utils';
import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { withFocus, withForwardRef } from '../hocs';
import { StyledAnchor } from './StyledAnchor';

var Anchor = function Anchor(_ref) {
  var a11yTitle = _ref.a11yTitle,
      children = _ref.children,
      color = _ref.color,
      disabled = _ref.disabled,
      forwardRef = _ref.forwardRef,
      href = _ref.href,
      icon = _ref.icon,
      focus = _ref.focus,
      label = _ref.label,
      onClick = _ref.onClick,
      reverse = _ref.reverse,
      theme = _ref.theme,
      rest = _objectWithoutPropertiesLoose(_ref, ["a11yTitle", "children", "color", "disabled", "forwardRef", "href", "icon", "focus", "label", "onClick", "reverse", "theme"]);

  useEffect(function () {
    if ((icon || label) && children) {
      console.warn('Anchor should not have children if icon or label is provided');
    }
  }, [children, icon, label]);
  var coloredIcon = icon;

  if (icon && !icon.props.color) {
    coloredIcon = cloneElement(icon, {
      color: normalizeColor(color || theme.anchor.color, theme)
    });
  }

  var first = reverse ? label : coloredIcon;
  var second = reverse ? coloredIcon : label;
  return React.createElement(StyledAnchor, _extends({}, rest, {
    ref: forwardRef,
    "aria-label": a11yTitle,
    colorProp: color,
    disabled: disabled,
    hasIcon: !!icon,
    focus: focus,
    hasLabel: label,
    reverse: reverse,
    href: !disabled ? href : undefined,
    onClick: !disabled ? onClick : undefined
  }), first && second ? React.createElement(Box, {
    as: "span",
    direction: "row",
    align: "center",
    gap: "small",
    style: {
      display: 'inline-flex'
    }
  }, first, second) : first || second || children);
};

Anchor.defaultProps = {};
Object.setPrototypeOf(Anchor.defaultProps, defaultProps);
var AnchorDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  AnchorDoc = require('./doc').doc(Anchor);
}

var AnchorWrapper = compose(withFocus(), withTheme, withForwardRef)(AnchorDoc || Anchor);
export { AnchorWrapper as Anchor };