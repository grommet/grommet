var _excluded = ["ref", "size"],
  _excluded2 = ["children", "color", "size", "message"],
  _excluded3 = ["size", "color", "border"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { isValidElement, forwardRef, useContext, useEffect } from 'react';
import { AnnounceContext } from '../../contexts/AnnounceContext';
import { Box } from '../Box';
import { SpinnerPropTypes } from './propTypes';
import { useThemeValue } from '../../utils/useThemeValue';
var BasicSpinner = function BasicSpinner(_ref) {
  var ref = _ref.ref,
    size = _ref.size,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme;
  return /*#__PURE__*/React.createElement(Box, _extends({
    flex: false,
    height: size,
    width: size,
    ref: ref,
    responsive: theme.spinner.responsive
  }, rest));
};
/**
 * If the user is calling <Spinner>…</Spinner> with children, it will take
 * precedence over theme styling. Yet, it will still inherit the
 * default animation and size of the spinner, and of course any additional
 * given props.
 *
 * If the user is providing an icon/svg via the theme.spinner.icon,
 * the Spinner will use it as a child and will include all its relevant
 * theme props (size/color/pad…) as well,
 * user will only need to type <Spinner />.
 * If the icon has its own animation, user can turn it off via the theme.
 *
 * If none of the above is provider, <Spinner /> will provide its default
 * border, size and friends, all configurable via theme or props.
 */
var Spinner = /*#__PURE__*/forwardRef(function (_ref2, ref) {
  var children = _ref2.children,
    colorProp = _ref2.color,
    size = _ref2.size,
    message = _ref2.message,
    rest = _objectWithoutPropertiesLoose(_ref2, _excluded2);
  var _useThemeValue2 = useThemeValue(),
    theme = _useThemeValue2.theme;
  var announce = useContext(AnnounceContext);
  useEffect(function () {
    if (message != null && message.start) announce(message.start);else if (typeof message === 'string') announce(message);
    return function () {
      return (message == null ? void 0 : message.end) && announce(message.end);
    };
  }, [announce, message]);

  // Avoid color and size leaking into the DOM
  var _theme$spinner$contai = theme.spinner.container,
    sizeThemeProp = _theme$spinner$contai.size,
    colorThemeProp = _theme$spinner$contai.color,
    borderThemeProp = _theme$spinner$contai.border,
    themeProps = _objectWithoutPropertiesLoose(_theme$spinner$contai, _excluded3);
  var normalizedSize = size || sizeThemeProp;
  var spinnerSize = theme.spinner.size[normalizedSize] || normalizedSize;
  var color = colorProp || colorThemeProp;
  var Icon = theme.spinner.icon;
  var defaultBorder = [{
    side: 'all',
    color: 'background-contrast',
    size: size
  }, {
    side: 'top',
    color: color,
    size: size
  }];
  var spinnerBorder = Array.isArray(borderThemeProp) ? borderThemeProp.map(function (borderSide) {
    return _extends({}, borderSide, {
      color: borderSide.side === 'all' ? borderSide.color || 'background-contrast' : color
    });
  }) : borderThemeProp;

  // children will take precedence over theme attributes
  if (children) {
    return /*#__PURE__*/React.createElement(BasicSpinner, _extends({
      size: spinnerSize,
      ref: ref
    }, rest), children);
  }

  // In case icon is provided by the theme
  if (Icon) return /*#__PURE__*/React.createElement(BasicSpinner, _extends({
    size: spinnerSize,
    ref: ref
  }, themeProps, rest), /*#__PURE__*/isValidElement(Icon) ? Icon : /*#__PURE__*/React.createElement(Icon, {
    size: spinnerSize,
    color: color
  }));
  return /*#__PURE__*/React.createElement(BasicSpinner, _extends({
    size: spinnerSize,
    ref: ref,
    border: typeof borderThemeProp === 'undefined' ? defaultBorder : spinnerBorder
  }, themeProps, rest));
});
Spinner.displayName = 'Spinner';
Spinner.propTypes = SpinnerPropTypes;
export { Spinner };