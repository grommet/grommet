"use strict";

exports.__esModule = true;
exports.Resizer = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _defaultProps = require("../../default-props");

var _Box = require("../Box");

var _Stack = require("../Stack");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var InteractionBox = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "Resizer__InteractionBox",
  componentId: "sc-8l808w-0"
})(["cursor:col-resize;> *{opacity:0;}", " &:hover{> *{opacity:1;}}"], function (props) {
  return props.active && '> * { opacity: 1; }';
});

var Resizer = function Resizer(_ref) {
  var onResize = _ref.onResize,
      property = _ref.property;

  var theme = (0, _react.useContext)(_styledComponents.ThemeContext) || _defaultProps.defaultProps.theme;

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
      var element = ref.current; // find TH parent

      while (element && element.nodeName !== 'TH') {
        element = element.parentNode;
      }

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

exports.Resizer = Resizer;
Resizer.displayName = 'Resizer';
Resizer.defaultProps = {};
Object.setPrototypeOf(Resizer.defaultProps, _defaultProps.defaultProps);