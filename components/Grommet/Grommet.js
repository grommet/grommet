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

var _excluded = ["children", "full", "containerTarget", "theme", "options", "messages"];

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _taggedTemplateLiteralLoose(strings, raw) { if (!raw) { raw = strings.slice(0); } strings.raw = raw; return strings; }

var FullGlobalStyle = (0, _styledComponents.createGlobalStyle)(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["\n  body { margin: 0; }\n"])));

var deviceResponsive = function deviceResponsive(userAgent, theme) {
  // log('--deviceResponsive', userAgent, theme);

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

var defaultOptions = {};
var Grommet = /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
  var children = props.children,
      full = props.full,
      _props$containerTarge = props.containerTarget,
      containerTarget = _props$containerTarge === void 0 ? typeof document === 'object' ? document.body : undefined : _props$containerTarge,
      themeProp = props.theme,
      _props$options = props.options,
      options = _props$options === void 0 ? defaultOptions : _props$options,
      messagesProp = props.messages,
      rest = _objectWithoutPropertiesLoose(props, _excluded);

  var background = props.background,
      dir = props.dir,
      themeMode = props.themeMode,
      userAgent = props.userAgent;

  var _useState = (0, _react.useState)(),
      stateResponsive = _useState[0],
      setResponsive = _useState[1];

  var theme = (0, _react.useMemo)(function () {
    var nextTheme = (0, _utils.deepMerge)(_themes.base, themeProp || {}); // if user provides specific menu alignment, we don't want
    // the defaults to be included at all (can cause issues with controlMirror)
    // override merged value with themeProp value

    if (themeProp && themeProp.menu && themeProp.menu.drop && themeProp.menu.drop.align) {
      delete nextTheme.menu.drop.align;
      nextTheme.menu.drop.align = themeProp.menu.drop.align;
    }

    var themeBackground = nextTheme.global.colors.background;
    nextTheme.dark = (themeMode || nextTheme.defaultMode) === 'dark';
    var color = (0, _utils.normalizeColor)(background || themeBackground, nextTheme);
    nextTheme.dark = (0, _utils.backgroundIsDark)(color, nextTheme);
    nextTheme.baseBackground = background || themeBackground; // This allows DataTable to intelligently set the background of a pinned
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
  var responsive = stateResponsive || deviceResponsive(userAgent, theme) || theme.global.deviceBreakpoints.tablet;
  var grommetRef = (0, _utils.useForwardedRef)(ref);
  return /*#__PURE__*/_react["default"].createElement(_contexts.ThemeContext.Provider, {
    value: theme
  }, /*#__PURE__*/_react["default"].createElement(_contexts.ResponsiveContext.Provider, {
    value: responsive
  }, /*#__PURE__*/_react["default"].createElement(_RootsContext.RootsContext.Provider, {
    value: [grommetRef.current]
  }, /*#__PURE__*/_react["default"].createElement(_contexts.ContainerTargetContext.Provider, {
    value: containerTarget
  }, /*#__PURE__*/_react["default"].createElement(_OptionsContext.OptionsContext.Provider, {
    value: options
  }, /*#__PURE__*/_react["default"].createElement(_MessageContext.MessageContext.Provider, {
    value: messages
  }, /*#__PURE__*/_react["default"].createElement(_StyledGrommet.StyledGrommet, _extends({
    full: full
  }, rest, {
    ref: grommetRef
  }), children), full && /*#__PURE__*/_react["default"].createElement(FullGlobalStyle, null)))))));
});
exports.Grommet = Grommet;
Grommet.displayName = 'Grommet';
Grommet.propTypes = _propTypes.GrommetPropTypes;