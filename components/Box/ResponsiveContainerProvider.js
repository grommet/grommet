"use strict";

exports.__esModule = true;
exports.ResponsiveContainerProvider = void 0;
var _react = _interopRequireWildcard(require("react"));
var _contexts = require("../../contexts");
var _responsive = require("../../utils/responsive");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
// The value of ResponsiveContainerContext
// when we're within a responsive container
var responsiveContainerValue = true;
var ResponsiveContainerProvider = exports.ResponsiveContainerProvider = function ResponsiveContainerProvider(_ref) {
  var container = _ref.container,
    theme = _ref.theme,
    children = _ref.children;
  var _useState = (0, _react.useState)(function () {
      var _theme$global;
      return (0, _responsive.deviceResponsive)(navigator.userAgent, theme) || (theme == null || (_theme$global = theme.global) == null ? void 0 : _theme$global.deviceBreakpoints.tablet);
    }),
    value = _useState[0],
    setValue = _useState[1];
  (0, _react.useEffect)(function () {
    if (!container) return undefined;

    // Track what breakpoint width of the container is at
    // and update the ResponsiveContext value accordingly.
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
            setValue((0, _responsive.getBreakpoint)(size, theme));
          }
        });
      });
      resizeObserver.observe(container);
    }
    // Initial size for ResponsiveContext in responsive container mode.
    // Also is a fallback for server side rendering
    var containerWidth = container.getBoundingClientRect().width;
    setValue((0, _responsive.getBreakpoint)(containerWidth, theme));
    return function () {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [container, theme]);
  return /*#__PURE__*/_react["default"].createElement(_contexts.ResponsiveContainerContext.Provider, {
    value: responsiveContainerValue
  }, /*#__PURE__*/_react["default"].createElement(_contexts.ResponsiveContext.Provider, {
    value: value
  }, children));
};