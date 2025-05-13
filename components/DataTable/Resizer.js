"use strict";

exports.__esModule = true;
exports.Resizer = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _Box = require("../Box");
var _Stack = require("../Stack");
var _useThemeValue2 = require("../../utils/useThemeValue");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var InteractionBox = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "Resizer__InteractionBox",
  componentId: "sc-8l808w-0"
})(["cursor:col-resize;> *{opacity:0;}", " &:hover{> *{opacity:1;}}"], function (props) {
  return props.active && '> * { opacity: 1; }';
});
var Resizer = exports.Resizer = function Resizer(_ref) {
  var onResize = _ref.onResize,
    property = _ref.property;
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme;
  var _useState = (0, _react.useState)(false),
    active = _useState[0],
    setActive = _useState[1];
  var _useState2 = (0, _react.useState)(),
    start = _useState2[0],
    setStart = _useState2[1];
  var _useState3 = (0, _react.useState)(),
    width = _useState3[0],
    setWidth = _useState3[1];
  var ref = (0, _react.useRef)();
  var onMouseDown = (0, _react.useCallback)(function (event) {
    if (ref.current) {
      var element = ref.current;
      // find TH parent
      while (element && element.nodeName !== 'TH') element = element.parentNode;
      var rect = element.getBoundingClientRect();
      setStart(event.clientX);
      setWidth(rect.width);
      setActive(true);
    }
  }, []);
  var onMouseMove = (0, _react.useCallback)(function (event) {
    // We determined 12 empirically as being wide enough to hit but
    // not too wide to cause false hits.
    var nextWidth = Math.max(12, width + (event.clientX - start));
    onResize(property, nextWidth);
  }, [onResize, property, start, width]);
  var onMouseUp = (0, _react.useCallback)(function () {
    setActive(false);
    setStart(undefined);
    setWidth(undefined);
  }, []);
  (0, _react.useEffect)(function () {
    var remove = function remove() {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    };
    if (active) {
      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('mousemove', onMouseMove);
      return remove;
    }
    remove();
    return undefined;
  }, [active, onMouseMove, onMouseUp]);
  var border;
  if (theme.dataTable.resize.hover && theme.dataTable.resize.hover.border) {
    var _theme$dataTable$resi = theme.dataTable.resize.hover.border,
      color = _theme$dataTable$resi.color,
      _theme$dataTable$resi2 = _theme$dataTable$resi.side,
      side = _theme$dataTable$resi2 === void 0 ? 'end' : _theme$dataTable$resi2,
      size = _theme$dataTable$resi.size;
    border = {
      color: color,
      side: side,
      size: size
    };
  }
  return /*#__PURE__*/_react["default"].createElement(_Stack.Stack, {
    anchor: "right"
  }, /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
    flex: false,
    responsive: false,
    pad: {
      vertical: 'small'
    }
  }, theme.dataTable.resize)), /*#__PURE__*/_react["default"].createElement(InteractionBox, {
    active: active,
    flex: false,
    pad: {
      left: 'xsmall'
    },
    ref: ref,
    responsive: false,
    onMouseDown: onMouseDown,
    onMouseMove: start !== undefined ? onMouseMove : undefined,
    onMouseUp: start !== undefined ? onMouseUp : undefined
  }, /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    pad: {
      vertical: 'small'
    },
    border: border
  })));
};
Resizer.displayName = 'Resizer';