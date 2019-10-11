function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { Children, useContext } from 'react';
import { compose } from 'recompose';
import { withForwardRef, withTheme } from '../hocs';
import { ThemeContext } from '../../contexts';
import { defaultProps } from '../../default-props';
import { backgroundIsDark } from '../../utils';
import { StyledBox, StyledBoxGap } from './StyledBox';

var Box = function Box(_ref) {
  var a11yTitle = _ref.a11yTitle,
      background = _ref.background,
      children = _ref.children,
      direction = _ref.direction,
      elevation = _ref.elevation,
      fill = _ref.fill,
      forwardRef = _ref.forwardRef,
      gap = _ref.gap,
      overflow = _ref.overflow,
      responsive = _ref.responsive,
      tag = _ref.tag,
      as = _ref.as,
      wrap = _ref.wrap,
      width = _ref.width,
      height = _ref.height,
      propsTheme = _ref.theme,
      rest = _objectWithoutPropertiesLoose(_ref, ["a11yTitle", "background", "children", "direction", "elevation", "fill", "forwardRef", "gap", "overflow", "responsive", "tag", "as", "wrap", "width", "height", "theme"]);

  var contextTheme = useContext(ThemeContext);
  var theme = contextTheme || propsTheme;
  var contents = children;

  if (gap) {
    contents = [];
    var firstIndex;
    Children.forEach(children, function (child, index) {
      if (child) {
        if (firstIndex === undefined) {
          firstIndex = index;
        } else {
          contents.push(React.createElement(StyledBoxGap // eslint-disable-next-line react/no-array-index-key
          , {
            key: "gap-" + index,
            gap: gap,
            directionProp: direction,
            responsive: responsive
          }));
        }
      }

      contents.push(child);
    });
  }

  var content = React.createElement(StyledBox, _extends({
    as: !as && tag ? tag : as,
    "aria-label": a11yTitle,
    background: background,
    ref: forwardRef,
    directionProp: direction,
    elevationProp: elevation,
    fillProp: fill,
    overflowProp: overflow,
    wrapProp: wrap,
    widthProp: width,
    heightProp: height,
    responsive: responsive
  }, rest), contents); // When a Box changes the darkness, it sets darkChanged so that StyledBox
  // can know what the underlying darkness is when deciding which elevation
  // to show.

  if (background || theme.darkChanged) {
    var dark = backgroundIsDark(background, theme);
    var darkChanged = dark !== undefined && dark !== theme.dark;

    if (darkChanged || theme.darkChanged) {
      dark = dark === undefined ? theme.dark : dark;
      content = React.createElement(ThemeContext.Provider, {
        value: _extends({}, theme, {
          dark: dark,
          darkChanged: darkChanged
        })
      }, content);
    }
  }

  return content;
};

Box.defaultProps = {
  direction: 'column',
  margin: 'none',
  pad: 'none',
  responsive: true
};
Object.setPrototypeOf(Box.defaultProps, defaultProps);
var BoxDoc;

if (process.env.NODE_ENV !== 'production') {
  BoxDoc = require('./doc').doc(Box); // eslint-disable-line global-require
}

var BoxWrapper = compose(withTheme, withForwardRef)(BoxDoc || Box);
export { BoxWrapper as Box };