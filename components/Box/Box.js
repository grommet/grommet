"use strict";

exports.__esModule = true;
exports.Box = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = require("styled-components");

var _defaultProps = require("../../default-props");

var _utils = require("../../utils");

var _Keyboard = require("../Keyboard");

var _StyledBox = require("./StyledBox");

var _propTypes = require("./propTypes");

var _excluded = ["a11yTitle", "background", "border", "children", "direction", "elevation", "fill", "gap", "onBlur", "onClick", "onFocus", "overflow", "responsive", "tag", "as", "wrap", "width", "height", "tabIndex"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Box = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
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
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);

  var theme = (0, _react.useContext)(_styledComponents.ThemeContext) || _defaultProps.defaultProps.theme;

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

  if ((border === 'between' || border && border.side === 'between') && !gap) {
    console.warn('Box must have a gap to use border between');
  }

  var contents = children;

  if (gap && gap !== 'none') {
    var boxAs = !as && tag ? tag : as;
    contents = [];
    var firstIndex;

    _react.Children.forEach(children, function (child, index) {
      if (child) {
        if (firstIndex === undefined) {
          firstIndex = index;
        } else {
          contents.push( /*#__PURE__*/_react["default"].createElement(_StyledBox.StyledBoxGap // eslint-disable-next-line react/no-array-index-key
          , {
            key: "gap-" + index,
            as: boxAs === 'span' ? boxAs : 'div',
            gap: gap,
            directionProp: direction,
            responsive: responsive,
            border: border
          }));
        }
      }

      contents.push(child);
    });
  } // construct a new theme object in case we have a background that wants
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
    overflowProp: overflow,
    wrapProp: wrap,
    widthProp: width,
    heightProp: height,
    responsive: responsive,
    tabIndex: adjustedTabIndex
  }, clickProps, rest), /*#__PURE__*/_react["default"].createElement(_styledComponents.ThemeContext.Provider, {
    value: nextTheme
  }, contents));

  if (onClick) {
    content = /*#__PURE__*/_react["default"].createElement(_Keyboard.Keyboard, {
      onEnter: onClick
    }, content);
  }

  return content;
});
exports.Box = Box;
Box.displayName = 'Box';
Box.propTypes = _propTypes.BoxPropTypes;