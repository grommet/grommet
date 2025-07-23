"use strict";

exports.__esModule = true;
exports.Resizer = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _Box = require("../Box");
var _Keyboard = require("../Keyboard");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _MessageContext = require("../../contexts/MessageContext");
var _styles = require("../../utils/styles");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var StyledResizer = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "Resizer__StyledResizer",
  componentId: "sc-8l808w-0"
})(["position:absolute;right:0;width:24px;height:100%;top:0;cursor:col-resize;z-index:1;&:focus{", "}&:focus:not(:focus-visible){", "}"], function (props) {
  return (!props.plain || props.focusIndicator) && (0, _styles.focusStyle)({
    inset: props.focusIndicator === 'inset'
  });
}, (0, _styles.unfocusStyle)());
var Resizer = exports.Resizer = function Resizer(_ref) {
  var onResize = _ref.onResize,
    property = _ref.property,
    headerText = _ref.headerText,
    messages = _ref.messages,
    headerId = _ref.headerId;
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme;
  var _useState = (0, _react.useState)(false),
    active = _useState[0],
    setActive = _useState[1];
  var _useState2 = (0, _react.useState)(),
    start = _useState2[0],
    setStart = _useState2[1];
  var _useState3 = (0, _react.useState)(0),
    width = _useState3[0],
    setWidth = _useState3[1];
  var ref = (0, _react.useRef)();
  var _useContext = (0, _react.useContext)(_MessageContext.MessageContext),
    format = _useContext.format;

  // Set the initial width based on the TH element's width
  (0, _react.useEffect)(function () {
    if (ref.current) {
      var element = ref.current;
      // find TH parent
      while (element && element.nodeName !== 'TH') element = element.parentNode;
      var rect = element.getBoundingClientRect();
      // Set initial width based on the TH element's width
      setWidth(rect.width);
    }
  }, [ref]);
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
  if (theme.dataTable.resize.border.color && theme.dataTable.resize.border.side) {
    var _theme$dataTable$resi = theme.dataTable.resize.border,
      color = _theme$dataTable$resi.color,
      _theme$dataTable$resi2 = _theme$dataTable$resi.side,
      side = _theme$dataTable$resi2 === void 0 ? 'end' : _theme$dataTable$resi2;
    border = {
      color: color,
      side: side
    };
  }
  var hoverBorder = border;
  if (theme.dataTable.resize.hover && theme.dataTable.resize.hover.border) {
    var _theme$dataTable$resi3 = theme.dataTable.resize.hover.border,
      _color = _theme$dataTable$resi3.color,
      _theme$dataTable$resi4 = _theme$dataTable$resi3.side,
      _side = _theme$dataTable$resi4 === void 0 ? 'end' : _theme$dataTable$resi4,
      size = _theme$dataTable$resi3.size;
    hoverBorder = {
      color: _color,
      side: _side,
      size: size
    };
  }
  var onKeyDown = (0, _react.useCallback)(function (event) {
    event.preventDefault();
    if (!ref.current) return;
    var element = ref.current;
    while (element && element.nodeName !== 'TH') element = element.parentNode;
    var currentWidth = element.getBoundingClientRect().width;
    // Used 12 here to align with the value set in onMouseMove
    var delta = event.key === 'ArrowLeft' ? -12 : 12;
    onResize(property, currentWidth + delta);
    setWidth(currentWidth + delta);
  }, [onResize, property]);
  var _useState4 = (0, _react.useState)(false),
    hover = _useState4[0],
    setHover = _useState4[1];
  var ariaLabel = format({
    id: 'dataTable.resizerAria',
    values: {
      headerText: headerText
    },
    messages: messages
  });
  return /*#__PURE__*/_react["default"].createElement(_Keyboard.Keyboard, {
    onLeft: onKeyDown,
    onRight: onKeyDown
  }, /*#__PURE__*/_react["default"].createElement(StyledResizer, {
    tabIndex: 0,
    "aria-label": width ? ariaLabel + " " + Math.trunc(width) + " pixels" : ariaLabel,
    onMouseEnter: function onMouseEnter() {
      return setHover(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setHover(false);
    },
    onMouseDown: onMouseDown,
    onMouseMove: start !== undefined ? onMouseMove : undefined,
    onMouseUp: start !== undefined ? onMouseUp : undefined,
    ref: ref,
    pad: {
      vertical: 'xsmall'
    },
    margin: {
      right: "-" + theme.global.edgeSize.small
    },
    role: "separator",
    "aria-valuenow": width,
    "aria-valuetext": width ? ariaLabel + " " + Math.trunc(width) + " pixels" : ariaLabel,
    "aria-controls": headerId,
    "aria-orientation": "vertical"
  }, /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    border: hover ? hoverBorder : border,
    height: "100%",
    alignSelf: "center"
  })));
};
Resizer.displayName = 'Resizer';