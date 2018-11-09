"use strict";

exports.__esModule = true;
exports.Box = void 0;

var _react = _interopRequireWildcard(require("react"));

var _recompose = require("recompose");

var _contexts = require("grommet-icons/contexts");

var _contexts2 = require("../../contexts");

var _utils = require("../../utils");

var _hocs = require("../hocs");

var _StyledBox = require("./StyledBox");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Box =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Box, _Component);

  function Box() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {});

    return _this;
  }

  Box.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    // Since Box can change the background color for its contents,
    // we update the theme to indicate whether the current context is `dark`
    // and what icon theme to use.
    var background = nextProps.background,
        propsTheme = nextProps.theme;
    var stateTheme = prevState.theme,
        priorTheme = prevState.priorTheme;
    var dark = propsTheme.dark;

    if (background) {
      dark = (0, _utils.backgroundIsDark)(background, propsTheme);
    }

    if (dark === propsTheme.dark && stateTheme) {
      return {
        theme: undefined,
        priorTheme: undefined
      };
    }

    if (dark !== propsTheme.dark && (!stateTheme || dark !== stateTheme.dark || propsTheme !== priorTheme)) {
      return {
        theme: _extends({}, propsTheme, {
          dark: dark,
          icon: dark ? propsTheme.iconThemes.dark : propsTheme.iconThemes.light
        }),
        priorTheme: propsTheme
      };
    }

    return null;
  };

  var _proto = Box.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        a11yTitle = _this$props.a11yTitle,
        children = _this$props.children,
        direction = _this$props.direction,
        elevation = _this$props.elevation,
        fill = _this$props.fill,
        forwardRef = _this$props.forwardRef,
        gap = _this$props.gap,
        overflow = _this$props.overflow,
        responsive = _this$props.responsive,
        tag = _this$props.tag,
        propsTheme = _this$props.theme,
        wrap = _this$props.wrap,
        width = _this$props.width,
        height = _this$props.height,
        rest = _objectWithoutPropertiesLoose(_this$props, ["a11yTitle", "children", "direction", "elevation", "fill", "forwardRef", "gap", "overflow", "responsive", "tag", "theme", "wrap", "width", "height"]);

    var _this$state = this.state,
        stateTheme = _this$state.theme,
        priorTheme = _this$state.priorTheme;
    var theme = stateTheme || propsTheme;
    var contents = children;

    if (gap) {
      contents = [];
      var firstIndex;

      _react.Children.forEach(children, function (child, index) {
        if (child) {
          if (firstIndex === undefined) {
            firstIndex = index;
          } else {
            contents.push(_react.default.createElement(_StyledBox.StyledBoxGap, {
              key: index,
              gap: gap,
              directionProp: direction,
              responsive: responsive,
              theme: theme
            }));
          }
        }

        contents.push(child);
      });
    }

    var content = _react.default.createElement(_StyledBox.StyledBox, _extends({
      as: tag,
      "aria-label": a11yTitle,
      ref: forwardRef,
      directionProp: direction,
      elevationProp: elevation,
      fillProp: fill,
      overflowProp: overflow,
      wrapProp: wrap,
      widthProp: width,
      heightProp: height,
      responsive: responsive,
      theme: theme,
      priorTheme: priorTheme
    }, rest), contents);

    if (stateTheme) {
      if (stateTheme.dark !== propsTheme.dark && stateTheme.icon) {
        content = _react.default.createElement(_contexts.ThemeContext.Provider, {
          value: stateTheme.icon
        }, content);
      }

      content = _react.default.createElement(_contexts2.ThemeContext.Provider, {
        value: stateTheme
      }, content);
    }

    return content;
  };

  return Box;
}(_react.Component);

_defineProperty(Box, "defaultProps", {
  direction: 'column',
  margin: 'none',
  pad: 'none',
  responsive: true,
  tag: 'div'
});

var BoxDoc;

if (process.env.NODE_ENV !== 'production') {
  BoxDoc = require('./doc').doc(Box); // eslint-disable-line global-require
}

var BoxWrapper = (0, _recompose.compose)(_hocs.withTheme, _hocs.withForwardRef)(BoxDoc || Box);
exports.Box = BoxWrapper;