"use strict";

exports.__esModule = true;
exports.Grommet = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = require("styled-components");
var _contexts = require("../../contexts");
var _utils = require("../../utils");
var _themes = require("../../themes");
var _StyledGrommet = require("./StyledGrommet");
var _RootsContext = require("../../contexts/RootsContext");
var _OptionsContext = require("../../contexts/OptionsContext");
var _MessageContext = require("../../contexts/MessageContext");
var _default = _interopRequireDefault(require("../../languages/default.json"));
var _propTypes = require("./propTypes");
var _AnalyticsContext = require("../../contexts/AnalyticsContext");
var _excluded = ["children", "full", "containerTarget", "theme", "options", "messages", "onAnalytics"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var FullGlobalStyle = (0, _styledComponents.createGlobalStyle)(["body{margin:0;}"]);
var defaultOptions = {};
var Grommet = exports.Grommet = /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
  var children = props.children,
    full = props.full,
    _props$containerTarge = props.containerTarget,
    containerTarget = _props$containerTarge === void 0 ? typeof document === 'object' ? document.body : undefined : _props$containerTarge,
    themeProp = props.theme,
    _props$options = props.options,
    options = _props$options === void 0 ? defaultOptions : _props$options,
    messagesProp = props.messages,
    onAnalytics = props.onAnalytics,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var background = props.background,
    dir = props.dir,
    themeMode = props.themeMode,
    userAgent = props.userAgent;
  var _useState = (0, _react.useState)(),
    stateResponsive = _useState[0],
    setResponsive = _useState[1];
  var theme = (0, _react.useMemo)(function () {
    var nextTheme = (0, _utils.deepMerge)(_themes.base, themeProp || {});

    // if user provides specific menu alignment, we don't want
    // the defaults to be included at all (can cause issues with controlMirror)
    // override merged value with themeProp value
    if (themeProp && themeProp.menu && themeProp.menu.drop && themeProp.menu.drop.align) {
      delete nextTheme.menu.drop.align;
      nextTheme.menu.drop.align = themeProp.menu.drop.align;
    }
    var themeBackground = nextTheme.global.colors.background;
    nextTheme.dark = (themeMode || nextTheme.defaultMode) === 'dark';
    if (themeMode === 'auto' && typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      nextTheme.dark = true;
    }
    var color = (0, _utils.normalizeColor)(background || themeBackground, nextTheme);
    nextTheme.dark = (0, _utils.backgroundIsDark)(color, nextTheme);
    nextTheme.baseBackground = background || themeBackground;
    // This allows DataTable to intelligently set the background of a pinned
    // header or footer.
    nextTheme.background = nextTheme.baseBackground;
    if (dir) {
      nextTheme.dir = dir;
    }
    return nextTheme;
  }, [background, dir, themeMode, themeProp]);
  var messages = (0, _react.useMemo)(function () {
    // combine the passed in messages, if any, with the default
    // messages and format function.
    var nextMessages = (0, _utils.deepMerge)(_default["default"], (messagesProp == null ? void 0 : messagesProp.messages) || {});
    return {
      messages: nextMessages,
      format: function format(opts) {
        var message = (messagesProp == null ? void 0 : messagesProp.format) && messagesProp.format(opts);
        return typeof message !== 'undefined' ? message : (0, _MessageContext.format)(opts, nextMessages);
      }
    };
  }, [messagesProp]);
  (0, _react.useEffect)(function () {
    var onResize = function onResize() {
      setResponsive((0, _utils.getBreakpoint)(document.body.clientWidth, theme));
    };
    window.addEventListener('resize', onResize);
    onResize();
    return function () {
      window.removeEventListener('resize', onResize);
    };
  }, [theme]);
  var responsive = stateResponsive || (0, _utils.deviceResponsive)(userAgent, theme) || theme.global.deviceBreakpoints.tablet;
  var grommetRef = (0, _utils.useForwardedRef)(ref);

  // track open FocusedContainers in a global array to manage
  // focus event listeners for trapFocus
  var roots = (0, _react.useRef)([]);
  (0, _react.useEffect)(function () {
    if (grommetRef.current) roots.current.push(grommetRef.current);
  }, [grommetRef]);
  var rootsContextValue = (0, _react.useMemo)(function () {
    return {
      roots: roots
    };
  }, []);
  return /*#__PURE__*/_react["default"].createElement(_contexts.ThemeContext.Provider, {
    value: theme
  }, /*#__PURE__*/_react["default"].createElement(_contexts.ResponsiveContext.Provider, {
    value: responsive
  }, /*#__PURE__*/_react["default"].createElement(_RootsContext.RootsContext.Provider, {
    value: rootsContextValue
  }, /*#__PURE__*/_react["default"].createElement(_contexts.ContainerTargetContext.Provider, {
    value: containerTarget
  }, /*#__PURE__*/_react["default"].createElement(_OptionsContext.OptionsContext.Provider, {
    value: options
  }, /*#__PURE__*/_react["default"].createElement(_MessageContext.MessageContext.Provider, {
    value: messages
  }, /*#__PURE__*/_react["default"].createElement(_AnalyticsContext.AnalyticsProvider, {
    onAnalytics: onAnalytics
  }, /*#__PURE__*/_react["default"].createElement(_StyledGrommet.StyledGrommet, _extends({
    full: full
  }, rest, {
    ref: grommetRef
  }), children), full && /*#__PURE__*/_react["default"].createElement(FullGlobalStyle, null))))))));
});
Grommet.displayName = 'Grommet';
Grommet.propTypes = _propTypes.GrommetPropTypes;