var _excluded = ["a11yTitle", "aria-label", "children", "color", "disabled", "gap", "href", "icon", "label", "onBlur", "onClick", "onFocus", "reverse", "size"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { cloneElement, forwardRef, useCallback, useContext, useEffect, useState } from 'react';
import { findButtonParent, normalizeColor, useSizedIcon } from '../../utils';
import { Box } from '../Box';
import { StyledAnchor } from './StyledAnchor';
import { AnchorPropTypes } from './propTypes';
import { useAnalytics } from '../../contexts/AnalyticsContext';
import { TextContext } from '../Text/TextContext';
import { useThemeValue } from '../../utils/useThemeValue';
var Anchor = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var _theme$anchor3, _theme$anchor4;
  var a11yTitle = _ref.a11yTitle,
    ariaLabel = _ref['aria-label'],
    children = _ref.children,
    color = _ref.color,
    disabled = _ref.disabled,
    gap = _ref.gap,
    href = _ref.href,
    icon = _ref.icon,
    label = _ref.label,
    _onBlur = _ref.onBlur,
    onClickProp = _ref.onClick,
    _onFocus = _ref.onFocus,
    reverse = _ref.reverse,
    sizeProp = _ref.size,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;
  var _useState = useState(),
    focus = _useState[0],
    setFocus = _useState[1];
  var _useContext = useContext(TextContext),
    size = _useContext.size;
  var sendAnalytics = useAnalytics();
  var onClick = useCallback(function (event) {
    sendAnalytics({
      type: 'anchorClick',
      element: findButtonParent(event.target),
      event: event,
      href: href,
      label: typeof label === 'string' ? label : undefined
    });
    if (onClickProp) onClickProp(event);
  }, [onClickProp, sendAnalytics, label, href]);
  useEffect(function () {
    if ((icon || label) && children) {
      console.warn('Anchor should not have children if icon or label is provided');
    }
  }, [children, icon, label]);
  var coloredIcon = icon;
  if (icon && !icon.props.color) {
    var _theme$anchor, _theme$anchor2;
    coloredIcon = /*#__PURE__*/cloneElement(icon, {
      color: normalizeColor(color || ((_theme$anchor = theme.anchor) == null || (_theme$anchor = _theme$anchor.icon) == null ? void 0 : _theme$anchor.color) || ((_theme$anchor2 = theme.anchor) == null || (_theme$anchor2 = _theme$anchor2.size) == null || (_theme$anchor2 = _theme$anchor2[sizeProp || size]) == null ? void 0 : _theme$anchor2.color) || theme.anchor.color, theme)
    });
  }
  var anchorIcon = useSizedIcon(coloredIcon, sizeProp || size, theme);
  var first = reverse ? label : anchorIcon;
  var second = reverse ? anchorIcon : label;
  return /*#__PURE__*/React.createElement(StyledAnchor, _extends({}, rest, {
    ref: ref,
    "aria-label": ariaLabel || a11yTitle,
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
    },
    size: sizeProp || size
  }, passThemeFlag), first && second ? /*#__PURE__*/React.createElement(Box, {
    as: "span",
    direction: "row",
    align: "center",
    gap: gap || ((_theme$anchor3 = theme.anchor) == null || (_theme$anchor3 = _theme$anchor3.size) == null || (_theme$anchor3 = _theme$anchor3[sizeProp]) == null ? void 0 : _theme$anchor3.gap) || ((_theme$anchor4 = theme.anchor) == null ? void 0 : _theme$anchor4.gap),
    responsive: false
  }, first, second) : first || second || children);
});
Anchor.displayName = 'Anchor';
Anchor.propTypes = AnchorPropTypes;
export { Anchor };