"use strict";

exports.__esModule = true;
exports.Box = void 0;

var _react = _interopRequireWildcard(require("react"));

var _recompose = require("recompose");

var _hocs = require("../hocs");

var _contexts = require("../../contexts");

var _defaultProps = require("../../default-props");

var _utils = require("../../utils");

var _StyledBox = require("./StyledBox");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

  var contextTheme = (0, _react.useContext)(_contexts.ThemeContext);
  var theme = contextTheme || propsTheme;
  var contents = children;

  if (gap) {
    contents = [];
    var firstIndex;

    _react.Children.forEach(children, function (child, index) {
      if (child) {
        if (firstIndex === undefined) {
          firstIndex = index;
        } else {
          contents.push(_react["default"].createElement(_StyledBox.StyledBoxGap // eslint-disable-next-line react/no-array-index-key
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

  var content = _react["default"].createElement(_StyledBox.StyledBox, _extends({
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
    var dark = (0, _utils.backgroundIsDark)(background, theme);
    var darkChanged = dark !== undefined && dark !== theme.dark;

    if (darkChanged || theme.darkChanged) {
      dark = dark === undefined ? theme.dark : dark;
      content = _react["default"].createElement(_contexts.ThemeContext.Provider, {
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
Object.setPrototypeOf(Box.defaultProps, _defaultProps.defaultProps);
var BoxDoc;

if (process.env.NODE_ENV !== 'production') {
  BoxDoc = require('./doc').doc(Box); // eslint-disable-line global-require
}

var BoxWrapper = (0, _recompose.compose)(_hocs.withTheme, _hocs.withForwardRef)(BoxDoc || Box);
exports.Box = BoxWrapper;