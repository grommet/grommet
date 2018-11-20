"use strict";

exports.__esModule = true;
exports.Grommet = void 0;

var _react = _interopRequireWildcard(require("react"));

var _contexts = require("grommet-icons/contexts");

var _recompose = require("recompose");

var _contexts2 = require("../../contexts");

var _base = require("../../themes/base");

var _utils = require("../../utils");

var _hocs = require("../hocs");

var _StyledGrommet = require("./StyledGrommet");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// grommet-icons isn't aware of the grommet dark background context.
// Here, we reduce the grommet theme colors to the correct flat color
// namespace for grommet-icons.
var reduceIconTheme = function reduceIconTheme(iconTheme, dark) {
  var result = _extends({}, iconTheme, {
    colors: _extends({}, iconTheme.colors)
  });

  Object.keys(result.colors).forEach(function (key) {
    if (typeof result.colors[key] === 'object') {
      result.colors[key] = (0, _utils.normalizeColor)(result.colors[key][dark ? 'dark' : 'light'], {
        dark: dark,
        global: {
          colors: result.colors
        }
      });
    } else {
      result.colors[key] = (0, _utils.normalizeColor)(result.colors[key], {
        dark: dark,
        global: {
          colors: result.colors
        }
      });
    }
  });
  return result;
};

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

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {});

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onResize", function () {
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
    var iconTheme = nextProps.iconTheme,
        theme = nextProps.theme;
    var stateTheme = prevState.theme,
        themeProp = prevState.themeProp,
        iconThemeProp = prevState.iconThemeProp;
    var nextTheme;

    if (theme && (theme !== themeProp || iconTheme !== iconThemeProp)) {
      // in case the supplied theme has global.colors but not icon.colors,
      // pre-merge the current base icon colors with the new theme colors.
      var iconColoredTheme = theme;

      if (!theme.icon || !theme.icon.colors) {
        iconColoredTheme = _extends({}, theme);
        iconColoredTheme.icon = _extends({}, theme.icon || {});
        iconColoredTheme.icon.colors = (0, _utils.deepMerge)(_base.base.icon.colors, (theme.global || {}).colors);
      }

      nextTheme = (0, _utils.deepMerge)(_base.base, iconColoredTheme);
    } else if (!theme && (themeProp || !stateTheme)) {
      nextTheme = _base.base;
    }

    if (nextTheme) {
      var _ref = nextTheme.global || _base.base.global,
          colors = _ref.colors;

      var color = colors.background;
      var dark = color ? (0, _utils.colorIsDark)(color) : false;
      var lightIconTheme = (0, _utils.deepMerge)(iconTheme, nextTheme.icon);
      var iconThemes = {
        dark: reduceIconTheme((0, _utils.deepMerge)(lightIconTheme, {
          color: colors.text.dark
        }), true),
        light: reduceIconTheme(lightIconTheme, false)
      };
      return {
        theme: _extends({}, nextTheme, {
          dark: dark,
          icon: dark ? iconThemes.dark : iconThemes.light,
          iconThemes: iconThemes
        }),
        themeProp: theme,
        iconThemeProp: iconTheme
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

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        rest = _objectWithoutPropertiesLoose(_this$props, ["children"]);

    delete rest.theme;
    var _this$state2 = this.state,
        responsive = _this$state2.responsive,
        theme = _this$state2.theme;
    return _react.default.createElement(_contexts2.ThemeContext.Provider, {
      value: theme
    }, _react.default.createElement(_contexts.ThemeContext.Provider, {
      value: theme.icon
    }, _react.default.createElement(_contexts2.ResponsiveContext.Provider, {
      value: responsive
    }, _react.default.createElement(_StyledGrommet.StyledGrommet, _extends({}, rest, {
      theme: theme
    }), children))));
  };

  return Grommet;
}(_react.Component);

var GrommetDoc;

if (process.env.NODE_ENV !== 'production') {
  GrommetDoc = require('./doc').doc(Grommet); // eslint-disable-line global-require
}

var GrommetWrapper = (0, _recompose.compose)(_hocs.withIconTheme)(GrommetDoc || Grommet);
exports.Grommet = GrommetWrapper;