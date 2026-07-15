var _excluded = ["a11yTitle", "background", "border", "children", "cssGap", "direction", "elevation", "fill", "gap", "kind", "onBlur", "onClick", "onFocus", "overflow", "responsive", "tag", "as", "wrap", "width", "height", "tabIndex", "skeleton"],
  _excluded2 = ["colors", "size"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { Children, forwardRef, useContext, useEffect, useMemo, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { backgroundIsDark, useForwardedRef } from '../../utils';
import { Keyboard } from '../Keyboard';
import { StyledBox, StyledBoxGap } from './StyledBox';
import { BoxPropTypes } from './propTypes';
import { SkeletonContext, useSkeleton } from '../Skeleton';
import { AnnounceContext } from '../../contexts/AnnounceContext';
import { OptionsContext } from '../../contexts/OptionsContext';
import { ResponsiveContainerContext } from '../../contexts';
import { ResponsiveContainerProvider } from './ResponsiveContainerProvider';
import { useThemeValue } from '../../utils/useThemeValue';
import { supportsContainerQueries } from '../../utils/responsive';
var Box = /*#__PURE__*/forwardRef(function (_ref, refProp) {
  var _theme$global$depreca2;
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
    responsiveProp = _ref$responsive === void 0 ? true : _ref$responsive,
    tag = _ref.tag,
    as = _ref.as,
    wrap = _ref.wrap,
    width = _ref.width,
    height = _ref.height,
    tabIndex = _ref.tabIndex,
    skeletonProp = _ref.skeleton,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;
  // boxOptions was created to preserve backwards compatibility but
  // should not be supported in v3
  var _useContext = useContext(OptionsContext),
    boxOptions = _useContext.box;
  var skeleton = useSkeleton();
  var _useState = useState(undefined),
    containerElement = _useState[0],
    setContainerElement = _useState[1];
  var responsiveContainer = useContext(ResponsiveContainerContext);
  var responsive = responsiveContainer && responsiveProp ? 'container' : responsiveProp;
  var background = backgroundProp;
  useEffect(function () {
    var _theme$global$depreca;
    if (process.env.NODE_ENV !== 'production' && backgroundProp && (_theme$global$depreca = theme.global.deprecated) != null && _theme$global$depreca.backgrounds) {
      var deprecatedBackground;
      if (typeof backgroundProp === 'string') {
        deprecatedBackground = theme.global.deprecated.backgrounds.find(function (item) {
          return item.name === backgroundProp;
        });
      } else if (typeof backgroundProp === 'object') {
        deprecatedBackground = theme.global.deprecated.backgrounds.find(function (item) {
          return item.name === backgroundProp.image || item.name === backgroundProp.color;
        });
      }
      if (deprecatedBackground) {
        console.warn(deprecatedBackground.message || "The background " + deprecatedBackground.name + " is deprecated.");
      }
    }
  }, [backgroundProp, (_theme$global$depreca2 = theme.global.deprecated) == null ? void 0 : _theme$global$depreca2.backgrounds]);
  var announce = useContext(AnnounceContext);
  var containerRef = useForwardedRef(refProp);

  // Save the ref as a state if we're in a responsive container.
  // We only need it in the responsive container case and it
  // needs to be in a state to cause a re-render.
  useEffect(function () {
    if (responsiveProp === 'container' && containerRef.current) {
      setContainerElement(containerRef.current);
    }
  }, [containerRef, responsiveProp]);
  useEffect(function () {
    if (typeof as === 'function') {
      if (refProp) {
        console.warn('ref and as={function} are incompatible. The ref will not get set.');
      }
      if (responsiveProp === 'container') {
        console.warn(
        // eslint-disable-next-line max-len
        'responsive="container" and as={function} are incompatible. Use one or the other.');
      }
    }
  }, [refProp, as, responsiveProp]);
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
  var _useState2 = useState(),
    focus = _useState2[0],
    setFocus = _useState2[1];
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
  if (gap && gap !== 'none' && (!(boxOptions != null && boxOptions.cssGap || cssGap || typeof gap === 'object') ||
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
          contents.push(/*#__PURE__*/React.createElement(StyledBoxGap
          // eslint-disable-next-line react/no-array-index-key
          , _extends({
            key: "gap-" + index,
            as: boxAs === 'span' ? boxAs : 'div',
            gap: gap,
            directionProp: direction,
            responsive: responsive,
            border: styledBoxGapBorder
          }, passThemeFlag)));
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

  // Only pass along the ref if the as prop is not a function.
  // The styled component will throw a warning if we try to pass
  // a ref when the as prop is a function. We do a console.warn
  // about this above in this case.
  var ref = typeof as === 'function' ? undefined : containerRef;
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
    gap: ((boxOptions == null ? void 0 : boxOptions.cssGap) || cssGap || typeof gap === 'object') && gap && gap !== 'none' && border !== 'between' && (border == null ? void 0 : border.side) !== 'between' && (!Array.isArray(border) || !border.find(function (b) {
      return b.side === 'between';
    })) && gap,
    kindProp: kind,
    overflowProp: overflow,
    wrapProp: wrap,
    widthProp: width,
    heightProp: height,
    responsive: responsive,
    responsiveContainer: responsiveProp === 'container',
    tabIndex: adjustedTabIndex
  }, clickProps, passThemeFlag, rest, skeletonProps), /*#__PURE__*/React.createElement(ThemeContext.Provider, {
    value: nextTheme
  }, contents));
  if (responsiveProp === 'container') {
    if (supportsContainerQueries()) {
      content = /*#__PURE__*/React.createElement(ResponsiveContainerProvider, {
        container: containerElement,
        theme: theme
      }, content);
    } else {
      console.warn('<Box responsive="container"> requires styled-components v6 or later');
    }
  }
  if (onClick) {
    content = /*#__PURE__*/React.createElement(Keyboard, {
      onEnter: onClick,
      onSpace: function onSpace(e) {
        e.preventDefault(); // prevent page scroll
        onClick(e);
      }
    }, content);
  }
  return content;
});
Box.displayName = 'Box';
Box.propTypes = BoxPropTypes;
export { Box };