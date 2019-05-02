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

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Box =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Box, _Component);

  function Box() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = Box.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        a11yTitle = _this$props.a11yTitle,
        background = _this$props.background,
        children = _this$props.children,
        direction = _this$props.direction,
        elevation = _this$props.elevation,
        fill = _this$props.fill,
        forwardRef = _this$props.forwardRef,
        gap = _this$props.gap,
        overflow = _this$props.overflow,
        responsive = _this$props.responsive,
        tag = _this$props.tag,
        as = _this$props.as,
        wrap = _this$props.wrap,
        width = _this$props.width,
        height = _this$props.height,
        propsTheme = _this$props.theme,
        rest = _objectWithoutPropertiesLoose(_this$props, ["a11yTitle", "background", "children", "direction", "elevation", "fill", "forwardRef", "gap", "overflow", "responsive", "tag", "as", "wrap", "width", "height", "theme"]);

    var theme = this.context || propsTheme;
    var contents = children;

    if (gap) {
      contents = [];
      var firstIndex;

      _react.Children.forEach(children, function (child, index) {
        if (child) {
          if (firstIndex === undefined) {
            firstIndex = index;
          } else {
            contents.push(_react.default.createElement(_StyledBox.StyledBoxGap // eslint-disable-next-line react/no-array-index-key
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

    var content = _react.default.createElement(_StyledBox.StyledBox, _extends({
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
        content = _react.default.createElement(_contexts.ThemeContext.Provider, {
          value: _extends({}, theme, {
            dark: dark,
            darkChanged: darkChanged
          })
        }, content);
      }
    }

    return content;
  };

  return Box;
}(_react.Component);

_defineProperty(Box, "contextType", _contexts.ThemeContext);

_defineProperty(Box, "displayName", 'Box');

_defineProperty(Box, "defaultProps", {
  direction: 'column',
  margin: 'none',
  pad: 'none',
  responsive: true
});

Object.setPrototypeOf(Box.defaultProps, _defaultProps.defaultProps);
var BoxDoc;

if (process.env.NODE_ENV !== 'production') {
  BoxDoc = require('./doc').doc(Box); // eslint-disable-line global-require
}

var BoxWrapper = (0, _recompose.compose)(_hocs.withTheme, _hocs.withForwardRef)(BoxDoc || Box);
exports.Box = BoxWrapper;