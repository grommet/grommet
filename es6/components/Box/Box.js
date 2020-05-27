function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { Children, forwardRef, useContext, useMemo, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';
import { backgroundIsDark } from '../../utils';
import { Keyboard } from '../Keyboard';
import { StyledBox, StyledBoxGap } from './StyledBox';
var Box = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var a11yTitle = _ref.a11yTitle,
      background = _ref.background,
      border = _ref.border,
      children = _ref.children,
      _ref$direction = _ref.direction,
      direction = _ref$direction === void 0 ? 'column' : _ref$direction,
      elevation = _ref.elevation,
      fill = _ref.fill,
      gap = _ref.gap,
      _onBlur = _ref.onBlur,
      onClick = _ref.onClick,
      _onFocus = _ref.onFocus,
      overflow = _ref.overflow,
      _ref$responsive = _ref.responsive,
      responsive = _ref$responsive === void 0 ? true : _ref$responsive,
      tag = _ref.tag,
      as = _ref.as,
      wrap = _ref.wrap,
      width = _ref.width,
      height = _ref.height,
      tabIndex = _ref.tabIndex,
      rest = _objectWithoutPropertiesLoose(_ref, ["a11yTitle", "background", "border", "children", "direction", "elevation", "fill", "gap", "onBlur", "onClick", "onFocus", "overflow", "responsive", "tag", "as", "wrap", "width", "height", "tabIndex"]);

  var theme = useContext(ThemeContext) || defaultProps.theme;
  var focusable = useMemo(function () {
    return onClick && !(tabIndex < 0);
  }, [onClick, tabIndex]);

  var _useState = useState(),
      focus = _useState[0],
      setFocus = _useState[1];

  var clickProps = useMemo(function () {
    if (focusable) {
      return {
        onClick: onClick,
        onFocus: function onFocus(event) {
          setFocus(true);
          if (_onFocus) _onFocus(event);
        },
        onBlur: function onBlur(event) {
          setFocus(false);
          if (_onBlur) _onBlur(event);
        }
      };
    }

    var result = {};
    if (_onBlur) result.onBlur = _onBlur;
    if (onClick) result.onClick = onClick;
    if (_onFocus) result.onFocus = _onFocus;
    return result;
  }, [focusable, onClick, _onFocus, _onBlur]);
  var adjustedTabIndex = useMemo(function () {
    if (tabIndex !== undefined) return tabIndex;
    if (focusable) return 0;
    return undefined;
  }, [focusable, tabIndex]);

  if ((border === 'between' || border && border.side === 'between') && !gap) {
    console.warn('Box must have a gap to use border between');
  }

  var contents = children;

  if (gap && gap !== 'none') {
    contents = [];
    var firstIndex;
    Children.forEach(children, function (child, index) {
      if (child) {
        if (firstIndex === undefined) {
          firstIndex = index;
        } else {
          contents.push( /*#__PURE__*/React.createElement(StyledBoxGap // eslint-disable-next-line react/no-array-index-key
          , {
            key: "gap-" + index,
            gap: gap,
            directionProp: direction,
            responsive: responsive,
            border: border
          }));
        }
      }

      contents.push(child);
    });
  }

  if (background || theme.darkChanged) {
    var dark = backgroundIsDark(background, theme);
    var darkChanged = dark !== undefined && dark !== theme.dark;

    if (darkChanged || theme.darkChanged) {
      dark = dark === undefined ? theme.dark : dark;
      contents = /*#__PURE__*/React.createElement(ThemeContext.Provider, {
        value: _extends({}, theme, {
          dark: dark
        })
      }, contents);
    }
  }

  var content = /*#__PURE__*/React.createElement(StyledBox, _extends({
    as: !as && tag ? tag : as,
    "aria-label": a11yTitle,
    background: background,
    border: border,
    ref: ref,
    directionProp: direction,
    elevationProp: elevation,
    fillProp: fill,
    focus: focus,
    overflowProp: overflow,
    wrapProp: wrap,
    widthProp: width,
    heightProp: height,
    responsive: responsive,
    tabIndex: adjustedTabIndex
  }, clickProps, rest), contents);

  if (onClick) {
    content = /*#__PURE__*/React.createElement(Keyboard, {
      onEnter: onClick
    }, content);
  }

  return content;
});
Box.displayName = 'Box';
var BoxDoc;

if (process.env.NODE_ENV !== 'production') {
  BoxDoc = require('./doc').doc(Box); // eslint-disable-line global-require
}

var BoxWrapper = BoxDoc || Box;
export { BoxWrapper as Box };