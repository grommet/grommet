var _excluded = ["a11yTitle", "background", "border", "children", "cssGap", "direction", "elevation", "fill", "gap", "kind", "onBlur", "onClick", "onFocus", "overflow", "responsive", "tag", "as", "wrap", "width", "height", "tabIndex", "skeleton"],
  _excluded2 = ["colors", "size"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { Children, forwardRef, useContext, useEffect, useMemo, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';
import { backgroundIsDark } from '../../utils';
import { Keyboard } from '../Keyboard';
import { StyledBox, StyledBoxGap } from './StyledBox';
import { BoxPropTypes } from './propTypes';
import { SkeletonContext, useSkeleton } from '../Skeleton';
import { AnnounceContext } from '../../contexts/AnnounceContext';
import { OptionsContext } from '../../contexts/OptionsContext';
var Box = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var a11yTitle = _ref.a11yTitle,
    backgroundProp = _ref.background,
    border = _ref.border,
    children = _ref.children,
    cssGap = _ref.cssGap,
    _ref$direction = _ref.direction,
    direction = _ref$direction === void 0 ? 'column' : _ref$direction,
    elevation = _ref.elevation,
    fill = _ref.fill,
    gap = _ref.gap,
    kind = _ref.kind,
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
    skeletonProp = _ref.skeleton,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var theme = useContext(ThemeContext) || defaultProps.theme;
  // boxOptions was created to preserve backwards compatibility but
  // should not be supported in v3
  var _useContext = useContext(OptionsContext),
    boxOptions = _useContext.box;
  var skeleton = useSkeleton();
  var background = backgroundProp;
  var announce = useContext(AnnounceContext);
  useEffect(function () {
    var _skeletonProp$message;
    if (skeletonProp != null && (_skeletonProp$message = skeletonProp.message) != null && _skeletonProp$message.start) announce(skeletonProp.message.start);else if (typeof (skeletonProp == null ? void 0 : skeletonProp.message) === 'string') announce(skeletonProp.message);
    return function () {
      var _skeletonProp$message2;
      return (skeletonProp == null || (_skeletonProp$message2 = skeletonProp.message) == null ? void 0 : _skeletonProp$message2.end) && announce(skeletonProp.message.end);
    };
  }, [announce, skeletonProp]);
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
  if ((border === 'between' || border && border.side === 'between' || Array.isArray(border) && border.find(function (b) {
    return b.side === 'between';
  })) && !gap) {
    console.warn('Box must have a gap to use border between');
  }
  var contents = children;
  if (gap && gap !== 'none' && (!(boxOptions != null && boxOptions.cssGap || cssGap) ||
  // need this approach to show border between
  border === 'between' || (border == null ? void 0 : border.side) === 'between' || Array.isArray(border) && border.find(function (b) {
    return b.side === 'between';
  }))) {
    // if border is an array, we need to extract the border between object
    var styledBoxGapBorder = Array.isArray(border) ? border.find(function (b) {
      return b.side === 'between';
    }) : border;
    var boxAs = !as && tag ? tag : as;
    contents = [];
    var firstIndex;
    Children.forEach(children, function (child, index) {
      if (child) {
        if (firstIndex === undefined) {
          firstIndex = index;
        } else {
          contents.push( /*#__PURE__*/React.createElement(StyledBoxGap
          // eslint-disable-next-line react/no-array-index-key
          , {
            key: "gap-" + index,
            as: boxAs === 'span' ? boxAs : 'div',
            gap: gap,
            directionProp: direction,
            responsive: responsive,
            border: styledBoxGapBorder
          }));
        }
      }
      contents.push(child);
    });
  }
  var nextSkeleton = useMemo(function () {
    // Decide if we need to add a new SkeletonContext. We need one if:
    //   1. skeleton info was set in a property OR
    //   2. there already is a SkeletonContext but this box has a
    //      background or border. This means the box probably is more
    //      distinguishable from the area around it.
    // We keep track of a depth so we know how to alternate backgrounds.
    if (skeletonProp || (background || border) && skeleton) {
      var depth = skeleton ? skeleton.depth + 1 : 0;
      return _extends({}, skeleton, {
        depth: depth
      }, typeof skeletonProp === 'object' ? skeletonProp : {});
    }
    return undefined;
  }, [background, border, skeleton, skeletonProp]);
  var skeletonProps = {};
  if (nextSkeleton) {
    var _theme$skeleton = theme.skeleton,
      skeletonThemeColors = _theme$skeleton.colors,
      skeletonThemeSize = _theme$skeleton.size,
      skeletonThemeProps = _objectWithoutPropertiesLoose(_theme$skeleton, _excluded2);
    var skeletonColors = nextSkeleton.colors ? nextSkeleton.colors[theme.dark ? 'dark' : 'light'] : skeletonThemeColors == null ? void 0 : skeletonThemeColors[theme.dark ? 'dark' : 'light'];
    skeletonProps = _extends({}, skeletonThemeProps);
    background = skeletonColors[nextSkeleton.depth % skeletonColors.length];
    if (skeletonProp != null && skeletonProp.animation) {
      skeletonProps.animation = skeletonProp.animation;
    }
    contents = /*#__PURE__*/React.createElement(SkeletonContext.Provider, {
      value: nextSkeleton
    }, contents);
  }

  // construct a new theme object in case we have a background that wants
  // to change the background color context
  var nextTheme = useMemo(function () {
    var result;
    if (background || theme.darkChanged) {
      var dark = backgroundIsDark(background, theme);
      var darkChanged = dark !== undefined && dark !== theme.dark;
      if (darkChanged || theme.darkChanged) {
        result = _extends({}, theme);
        result.dark = dark === undefined ? theme.dark : dark;
        result.background = background;
      } else if (background) {
        // This allows DataTable to intelligently set the background
        // of a pinned header or footer.
        result = _extends({}, theme);
        result.background = background;
      }
    }
    return result || theme;
  }, [background, theme]);
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
    gap: ((boxOptions == null ? void 0 : boxOptions.cssGap) || cssGap) && gap && gap !== 'none' && border !== 'between' && (border == null ? void 0 : border.side) !== 'between' && (!Array.isArray(border) || !border.find(function (b) {
      return b.side === 'between';
    })) && gap,
    kindProp: kind,
    overflowProp: overflow,
    wrapProp: wrap,
    widthProp: width,
    heightProp: height,
    responsive: responsive,
    tabIndex: adjustedTabIndex
  }, clickProps, rest, skeletonProps), /*#__PURE__*/React.createElement(ThemeContext.Provider, {
    value: nextTheme
  }, contents));
  if (onClick) {
    content = /*#__PURE__*/React.createElement(Keyboard, {
      onEnter: onClick
    }, content);
  }
  return content;
});
Box.displayName = 'Box';
Box.propTypes = BoxPropTypes;
export { Box };