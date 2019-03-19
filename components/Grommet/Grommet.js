"use strict";

exports.__esModule = true;
exports.Grommet = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = require("styled-components");

var _grommetStyles = require("grommet-styles");

var _contexts = require("../../contexts");

var _utils = require("../../utils");

var _themes = require("../../themes");

var _StyledGrommet = require("./StyledGrommet");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["\n  body { margin: 0; }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteralLoose(strings, raw) { if (!raw) { raw = strings.slice(0); } strings.raw = raw; return strings; }

var FullGlobalStyle = (0, _styledComponents.createGlobalStyle)(_templateObject());

var Grommet =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Grommet, _Component);

  function Grommet() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {});

    _defineProperty(_assertThisInitialized(_this), "onResize", function () {
      var _this$state = _this.state,
          theme = _this$state.theme,
          responsive = _this$state.responsive;
      var breakpoint = (0, _utils.getBreakpoint)(window.innerWidth, theme);

      if (breakpoint !== responsive) {
        _this.setState({
          responsive: breakpoint
        });
      }
    });

    return _this;
  }

  Grommet.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var _nextProps$theme = nextProps.theme,
        theme = _nextProps$theme === void 0 ? {} : _nextProps$theme;
    var stateTheme = prevState.theme,
        themeProp = prevState.themeProp;
    var nextTheme = (0, _utils.deepMerge)(_themes.base, theme);

    if (!stateTheme || theme !== themeProp) {
      if (typeof theme.dark === 'undefined') {
        // calculate if background is dark or not
        // otherwise respect the property passed in the theme
        var colors = nextTheme.global.colors;
        var color = colors.background;
        nextTheme.dark = color ? (0, _grommetStyles.colorIsDark)(color) : false;
      }

      return {
        theme: nextTheme,
        themeProp: theme
      };
    }

    return null;
  };

  var _proto = Grommet.prototype;

  _proto.componentDidMount = function componentDidMount() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  };

  _proto.deviceResponsive = function deviceResponsive() {
    var userAgent = this.props.userAgent;
    var theme = this.state.theme;
    /*
     * Regexes provided for mobile and tablet detection are meant to replace
     * a full-featured specific library due to contributing a considerable size
     * into the bundle.
     *
     * User agents found https://deviceatlas.com/blog/list-of-user-agent-strings
     */

    if (userAgent) {
      if (/(tablet|ipad|playbook|silk)|(android(?!.*mobile))/i.test(userAgent)) {
        return (0, _utils.getDeviceBreakpoint)('tablet', theme);
      }

      if (/Mobile|iPhone|Android/.test(userAgent)) {
        return (0, _utils.getDeviceBreakpoint)('phone', theme);
      }

      return (0, _utils.getDeviceBreakpoint)('computer', theme);
    }

    return undefined;
  };

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        full = _this$props.full,
        rest = _objectWithoutPropertiesLoose(_this$props, ["children", "full"]);

    delete rest.theme;
    var _this$state2 = this.state,
        theme = _this$state2.theme,
        stateResponsive = _this$state2.responsive; // Value from state should be correct once we resize
    // On first render we try to guess otherwise set the default as a tablet

    var responsive = stateResponsive || this.deviceResponsive() || theme.global.deviceBreakpoints.tablet;
    return _react.default.createElement(_contexts.ThemeContext.Provider, {
      value: theme
    }, _react.default.createElement(_contexts.ResponsiveContext.Provider, {
      value: responsive
    }, _react.default.createElement(_StyledGrommet.StyledGrommet, _extends({
      full: full
    }, rest), children), full && _react.default.createElement(FullGlobalStyle, null)));
  };

  return Grommet;
}(_react.Component);

_defineProperty(Grommet, "displayName", 'Grommet');

var GrommetDoc;

if (process.env.NODE_ENV !== 'production') {
  GrommetDoc = require('./doc').doc(Grommet); // eslint-disable-line global-require
}

var GrommetWrapper = GrommetDoc || Grommet;
exports.Grommet = GrommetWrapper;