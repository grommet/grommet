function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { cloneElement, forwardRef, useContext, useEffect, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';
import { normalizeColor } from '../../utils';
import { Box } from '../Box';
import { StyledAnchor } from './StyledAnchor';
var Anchor = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var a11yTitle = _ref.a11yTitle,
      children = _ref.children,
      color = _ref.color,
      disabled = _ref.disabled,
      href = _ref.href,
      icon = _ref.icon,
      label = _ref.label,
      _onBlur = _ref.onBlur,
      onClick = _ref.onClick,
      _onFocus = _ref.onFocus,
      reverse = _ref.reverse,
      rest = _objectWithoutPropertiesLoose(_ref, ["a11yTitle", "children", "color", "disabled", "href", "icon", "label", "onBlur", "onClick", "onFocus", "reverse"]);

  var theme = useContext(ThemeContext) || defaultProps.theme;

  var _useState = useState(),
      focus = _useState[0],
      setFocus = _useState[1];

  useEffect(function () {
    if ((icon || label) && children) {
      console.warn('Anchor should not have children if icon or label is provided');
    }
  }, [children, icon, label]);
  var coloredIcon = icon;

  if (icon && !icon.props.color) {
    coloredIcon = /*#__PURE__*/cloneElement(icon, {
      color: normalizeColor(color || theme.anchor.color, theme)
    });
  }

  var first = reverse ? label : coloredIcon;
  var second = reverse ? coloredIcon : label;
  return /*#__PURE__*/React.createElement(StyledAnchor, _extends({}, rest, {
    ref: ref,
    "aria-label": a11yTitle,
    colorProp: color,
    disabled: disabled,
    hasIcon: !!icon,
    focus: focus,
    hasLabel: label,
    reverse: reverse,
    href: !disabled ? href : undefined,
    onClick: !disabled ? onClick : undefined,
    onFocus: function onFocus(event) {
      setFocus(true);
      if (_onFocus) _onFocus(event);
    },
    onBlur: function onBlur(event) {
      setFocus(false);
      if (_onBlur) _onBlur(event);
    }
  }), first && second ? /*#__PURE__*/React.createElement(Box, {
    as: "span",
    direction: "row",
    align: "center",
    gap: "small",
    style: {
      display: 'inline-flex'
    }
  }, first, second) : first || second || children);
});
Anchor.displayName = 'Anchor';
var AnchorDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  AnchorDoc = require('./doc').doc(Anchor);
}

var AnchorWrapper = AnchorDoc || Anchor;
export { AnchorWrapper as Anchor };