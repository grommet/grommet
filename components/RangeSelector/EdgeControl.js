"use strict";

exports.__esModule = true;
exports.EdgeControl = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _defaultProps = require("../../default-props");

var _Box = require("../Box");

var _Keyboard = require("../Keyboard");

var _utils = require("../../utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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
  componentId: "sc-1xo2yt9-0"
})(["", ""], function (props) {
  return props.focus && (0, _utils.focusStyle)();
});
var EdgeControl = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var color = _ref.color,
      direction = _ref.direction,
      edge = _ref.edge,
      onDecrease = _ref.onDecrease,
      onIncrease = _ref.onIncrease,
      thickness = _ref.thickness,
      rest = _objectWithoutPropertiesLoose(_ref, ["color", "direction", "edge", "onDecrease", "onIncrease", "thickness"]);

  var theme = (0, _react.useContext)(_styledComponents.ThemeContext);

  var _useState = (0, _react.useState)(false),
      focus = _useState[0],
      setFocus = _useState[1];

  var _DIRECTION_PROPS$dire = DIRECTION_PROPS[direction],
      cursor = _DIRECTION_PROPS$dire.cursor,
      fill = _DIRECTION_PROPS$dire.fill;
  var size = (0, _utils.parseMetricToNum)(theme.global.spacing) / 2;
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
  }, /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
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
      zIndex: 10
    },
    tabIndex: 0,
    onFocus: function onFocus() {
      return setFocus(true);
    },
    onBlur: function onBlur() {
      return setFocus(false);
    }
  }, rest), node)));
});
exports.EdgeControl = EdgeControl;
EdgeControl.displayName = 'EdgeControl';
EdgeControl.defaultProps = {};
Object.setPrototypeOf(EdgeControl.defaultProps, _defaultProps.defaultProps);