"use strict";

exports.__esModule = true;
exports.EdgeControl = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _Box = require("../Box");
var _Keyboard = require("../Keyboard");
var _utils = require("../../utils");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _MessageContext = require("../../contexts/MessageContext");
var _excluded = ["color", "direction", "edge", "onDecrease", "onIncrease", "thickness", "max", "min", "messages", "value", "step"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
// Add visually hidden input styles
var VisuallyHiddenInput = _styledComponents["default"].input.withConfig({
  displayName: "EdgeControl__VisuallyHiddenInput",
  componentId: "sc-1xo2yt9-0"
})(["position:absolute;clip:rect(0 0 0 0);clip-path:inset(50%);height:1px;overflow:hidden;white-space:nowrap;width:1px;"]);
var DIRECTION_PROPS = {
  horizontal: {
    cursor: 'col-resize',
    fill: 'vertical'
  },
  vertical: {
    cursor: 'row-resize',
    fill: 'horizontal'
  }
};
var StyledBox = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "EdgeControl__StyledBox",
  componentId: "sc-1xo2yt9-1"
})(["", ""], function (props) {
  return props.focus && (0, _utils.focusStyle)();
});
var EdgeControl = exports.EdgeControl = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var _theme$rangeSelector;
  var color = _ref.color,
    direction = _ref.direction,
    edge = _ref.edge,
    onDecrease = _ref.onDecrease,
    onIncrease = _ref.onIncrease,
    thickness = _ref.thickness,
    max = _ref.max,
    min = _ref.min,
    messages = _ref.messages,
    value = _ref.value,
    step = _ref.step,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme;
  var _useState = (0, _react.useState)(false),
    focus = _useState[0],
    setFocus = _useState[1];
  var _DIRECTION_PROPS$dire = DIRECTION_PROPS[direction],
    cursor = _DIRECTION_PROPS$dire.cursor,
    fill = _DIRECTION_PROPS$dire.fill;
  var _useContext = (0, _react.useContext)(_MessageContext.MessageContext),
    format = _useContext.format;
  var themeEdgeSize = (_theme$rangeSelector = theme.rangeSelector) == null || (_theme$rangeSelector = _theme$rangeSelector.edge) == null ? void 0 : _theme$rangeSelector.size;
  var size;
  if (themeEdgeSize) {
    var _theme$global$edgeSiz;
    // Try to look up the value in theme.global.edgeSize
    // If not found, assume it's a raw CSS value like '10px'.
    var themeEdge = ((_theme$global$edgeSiz = theme.global.edgeSize) == null ? void 0 : _theme$global$edgeSiz[themeEdgeSize]) || themeEdgeSize;
    var parsedSize = (0, _utils.parseMetricToNum)(themeEdge);
    var isValid = typeof parsedSize === 'number' && !Number.isNaN(parsedSize);

    // If parsedSize is a valid number, use it.
    // Otherwise, fallback to half of the theme's global spacing.
    size = isValid ? parsedSize : (0, _utils.parseMetricToNum)(theme.global.spacing) / 2;
  } else {
    // If no edge size was specified use default.
    size = (0, _utils.parseMetricToNum)(theme.global.spacing) / 2;
  }
  var keyboardProps = direction === 'vertical' ? {
    onUp: onDecrease,
    onDown: onIncrease
  } : {
    onLeft: onDecrease,
    onRight: onIncrease
  };
  var boxDirection = direction === 'vertical' ? 'row' : 'column';
  var type = theme.rangeSelector && theme.rangeSelector.edge && theme.rangeSelector.edge.type || 'disc';
  var node;
  var backgroundColor = (0, _utils.normalizeColor)(color || 'control', theme);
  if (type === 'bar') {
    node = /*#__PURE__*/_react["default"].createElement(StyledBox, {
      flex: !thickness,
      justifySelf: "stretch",
      width: direction === 'vertical' ? thickness : size + "px",
      height: direction === 'vertical' ? size + "px" : thickness,
      background: backgroundColor,
      focus: focus
    });
  } else if (type === 'disc') {
    node = /*#__PURE__*/_react["default"].createElement(StyledBox, {
      width: size + "px",
      height: size + "px",
      round: "full",
      background: backgroundColor,
      focus: focus
    });
  } else {
    node = type;
  }
  return /*#__PURE__*/_react["default"].createElement(_Keyboard.Keyboard, keyboardProps, /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    direction: boxDirection,
    style: {
      flex: '0 0 1px'
    },
    overflow: "visible",
    align: "center",
    justify: "center",
    alignSelf: "stretch"
  }, /*#__PURE__*/_react["default"].createElement(VisuallyHiddenInput, {
    type: "range",
    min: min,
    max: max,
    step: step,
    value: value,
    onFocus: function onFocus() {
      return setFocus(true);
    },
    onBlur: function onBlur() {
      return setFocus(false);
    },
    "aria-label": format({
      id: edge === 'lower' ? 'rangeSelector.lower' : 'rangeSelector.upper',
      messages: messages
    }),
    "aria-valuemin": min,
    "aria-valuemax": max,
    "aria-valuenow": value,
    readOnly: true
  }), /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
    ref: ref,
    direction: boxDirection,
    justify: "center",
    align: "center",
    basis: "full",
    fill: fill,
    style: {
      cursor: cursor,
      outline: 'none',
      minWidth: size,
      minHeight: size,
      zIndex: 1
    },
    tabIndex: -1
  }, rest), node)));
});
EdgeControl.displayName = 'EdgeControl';