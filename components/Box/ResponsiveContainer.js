"use strict";

exports.__esModule = true;
exports.ResponsiveContainer = void 0;
var _react = _interopRequireWildcard(require("react"));
var _contexts = require("../../contexts");
var _StyledResponsiveContainer = require("./StyledResponsiveContainer");
var _utils = require("../../utils");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var responsiveContainerValue = true;
var ResponsiveContainer = exports.ResponsiveContainer = function ResponsiveContainer(_ref) {
  var _theme$global;
  var children = _ref.children;
  var theme = (0, _react.useContext)(_contexts.ThemeContext);
  var ref = (0, _react.useRef)(undefined);
  var _useState = (0, _react.useState)(),
    stateResponsive = _useState[0],
    setStateResponsive = _useState[1];
  (0, _react.useEffect)(function () {
    var element = ref == null ? void 0 : ref.current;
    if (!element) return undefined;
    var resizeObserver;
    if (typeof window !== 'undefined' && window.ResizeObserver) {
      resizeObserver = new window.ResizeObserver(function (entries) {
        window.requestAnimationFrame(function () {
          var _entries$;
          if (!Array.isArray(entries) || !entries.length) {
            return;
          }
          var size = (_entries$ = entries[0]) == null || (_entries$ = _entries$.borderBoxSize) == null || (_entries$ = _entries$[0]) == null ? void 0 : _entries$.inlineSize;
          if (size) {
            setStateResponsive((0, _utils.getBreakpoint)(size, theme));
          }
        });
      });
      resizeObserver.observe(element);
    } else {
      // fallback for server side rendering
      var _element$getBoundingC = element.getBoundingClientRect(),
        width = _element$getBoundingC.width;
      setStateResponsive((0, _utils.getBreakpoint)(width, theme));
    }
    return function () {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [theme]);
  var responsive = stateResponsive || (0, _utils.deviceResponsive)(navigator.userAgent, theme) || (theme == null || (_theme$global = theme.global) == null ? void 0 : _theme$global.deviceBreakpoints.tablet);
  return /*#__PURE__*/_react["default"].createElement(_contexts.ResponsiveContext.Provider, {
    value: responsive
  }, /*#__PURE__*/_react["default"].createElement(_contexts.ResponsiveContainerContext.Provider, {
    value: responsiveContainerValue
  }, /*#__PURE__*/_react["default"].createElement(_StyledResponsiveContainer.StyledResponsiveContainer, {
    ref: ref
  }, children)));
};