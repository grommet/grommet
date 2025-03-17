"use strict";

exports.__esModule = true;
exports.Box = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = require("styled-components");
var _utils = require("../../utils");
var _Keyboard = require("../Keyboard");
var _StyledBox = require("./StyledBox");
var _propTypes = require("./propTypes");
var _ResponsiveContainer = require("./ResponsiveContainer");
var _Skeleton = require("../Skeleton");
var _AnnounceContext = require("../../contexts/AnnounceContext");
var _OptionsContext = require("../../contexts/OptionsContext");
var _contexts = require("../../contexts");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _responsive = require("../../utils/responsive");
var _excluded = ["a11yTitle", "background", "border", "children", "cssGap", "direction", "elevation", "fill", "gap", "kind", "onBlur", "onClick", "onFocus", "overflow", "responsive", "tag", "as", "wrap", "width", "height", "tabIndex", "skeleton"],
  _excluded2 = ["colors", "size"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var Box = exports.Box = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
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
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;
  // boxOptions was created to preserve backwards compatibility but
  // should not be supported in v3
  var _useContext = (0, _react.useContext)(_OptionsContext.OptionsContext),
    boxOptions = _useContext.box;
  var skeleton = (0, _Skeleton.useSkeleton)();
  var responsiveContainer = (0, _react.useContext)(_contexts.ResponsiveContainerContext);
  var responsive = responsiveContainer && responsiveProp ? 'container' : responsiveProp;
  var background = backgroundProp;
  var announce = (0, _react.useContext)(_AnnounceContext.AnnounceContext);
  (0, _react.useEffect)(function () {
    var _skeletonProp$message;
    if (skeletonProp != null && (_skeletonProp$message = skeletonProp.message) != null && _skeletonProp$message.start) announce(skeletonProp.message.start);else if (typeof (skeletonProp == null ? void 0 : skeletonProp.message) === 'string') announce(skeletonProp.message);
    return function () {
      var _skeletonProp$message2;
      return (skeletonProp == null || (_skeletonProp$message2 = skeletonProp.message) == null ? void 0 : _skeletonProp$message2.end) && announce(skeletonProp.message.end);
    };
  }, [announce, skeletonProp]);
  var focusable = (0, _react.useMemo)(function () {
    return onClick && !(tabIndex < 0);
  }, [onClick, tabIndex]);
  var _useState = (0, _react.useState)(),
    focus = _useState[0],
    setFocus = _useState[1];
  var clickProps = (0, _react.useMemo)(function () {
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
  var adjustedTabIndex = (0, _react.useMemo)(function () {
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
    _react.Children.forEach(children, function (child, index) {
      if (child) {
        if (firstIndex === undefined) {
          firstIndex = index;
        } else {
          contents.push(/*#__PURE__*/_react["default"].createElement(_StyledBox.StyledBoxGap
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
  var nextSkeleton = (0, _react.useMemo)(function () {
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
    contents = /*#__PURE__*/_react["default"].createElement(_Skeleton.SkeletonContext.Provider, {
      value: nextSkeleton
    }, contents);
  }

  // construct a new theme object in case we have a background that wants
  // to change the background color context
  var nextTheme = (0, _react.useMemo)(function () {
    var result;
    if (background || theme.darkChanged) {
      var dark = (0, _utils.backgroundIsDark)(background, theme);
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
  var content = /*#__PURE__*/_react["default"].createElement(_StyledBox.StyledBox, _extends({
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
    tabIndex: adjustedTabIndex
  }, clickProps, passThemeFlag, rest, skeletonProps), /*#__PURE__*/_react["default"].createElement(_styledComponents.ThemeContext.Provider, {
    value: nextTheme
  }, contents));
  if (responsiveProp === 'container') {
    if ((0, _responsive.supportsContainerQueries)()) {
      content = /*#__PURE__*/_react["default"].createElement(_ResponsiveContainer.ResponsiveContainer, null, content);
    } else {
      console.warn('<Box responsive="container"> requires styled-components v6 or later');
    }
  }
  if (onClick) {
    content = /*#__PURE__*/_react["default"].createElement(_Keyboard.Keyboard, {
      onEnter: onClick
    }, content);
  }
  return content;
});
Box.displayName = 'Box';
Box.propTypes = _propTypes.BoxPropTypes;