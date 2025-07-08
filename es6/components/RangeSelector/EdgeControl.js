var _excluded = ["color", "direction", "edge", "onDecrease", "onIncrease", "thickness", "max", "min", "messages", "value", "step"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { useContext, forwardRef, useState } from 'react';
import styled from 'styled-components';
import { Box } from '../Box';
import { Keyboard } from '../Keyboard';
import { focusStyle, normalizeColor, parseMetricToNum } from '../../utils';
import { useThemeValue } from '../../utils/useThemeValue';
import { MessageContext } from '../../contexts/MessageContext';

// Add visually hidden input styles
var VisuallyHiddenInput = styled.input.withConfig({
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
var StyledBox = styled(Box).withConfig({
  displayName: "EdgeControl__StyledBox",
  componentId: "sc-1xo2yt9-1"
})(["", ""], function (props) {
  return props.focus && focusStyle();
});
var EdgeControl = /*#__PURE__*/forwardRef(function (_ref, ref) {
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
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme;
  var _useState = useState(false),
    focus = _useState[0],
    setFocus = _useState[1];
  var _DIRECTION_PROPS$dire = DIRECTION_PROPS[direction],
    cursor = _DIRECTION_PROPS$dire.cursor,
    fill = _DIRECTION_PROPS$dire.fill;
  var _useContext = useContext(MessageContext),
    format = _useContext.format;
  var themeEdgeSize = (_theme$rangeSelector = theme.rangeSelector) == null || (_theme$rangeSelector = _theme$rangeSelector.edge) == null ? void 0 : _theme$rangeSelector.size;
  var size;
  if (themeEdgeSize) {
    var _theme$global$edgeSiz;
    // Try to look up the value in theme.global.edgeSize
    // If not found, assume it's a raw CSS value like '10px'.
    var themeEdge = ((_theme$global$edgeSiz = theme.global.edgeSize) == null ? void 0 : _theme$global$edgeSiz[themeEdgeSize]) || themeEdgeSize;
    var parsedSize = parseMetricToNum(themeEdge);
    var isValid = typeof parsedSize === 'number' && !Number.isNaN(parsedSize);

    // If parsedSize is a valid number, use it.
    // Otherwise, fallback to half of the theme's global spacing.
    size = isValid ? parsedSize : parseMetricToNum(theme.global.spacing) / 2;
  } else {
    // If no edge size was specified use default.
    size = parseMetricToNum(theme.global.spacing) / 2;
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
  var backgroundColor = normalizeColor(color || 'control', theme);
  if (type === 'bar') {
    node = /*#__PURE__*/React.createElement(StyledBox, {
      flex: !thickness,
      justifySelf: "stretch",
      width: direction === 'vertical' ? thickness : size + "px",
      height: direction === 'vertical' ? size + "px" : thickness,
      background: backgroundColor,
      focus: focus
    });
  } else if (type === 'disc') {
    node = /*#__PURE__*/React.createElement(StyledBox, {
      width: size + "px",
      height: size + "px",
      round: "full",
      background: backgroundColor,
      focus: focus
    });
  } else {
    node = type;
  }
  return /*#__PURE__*/React.createElement(Keyboard, keyboardProps, /*#__PURE__*/React.createElement(Box, {
    direction: boxDirection,
    style: {
      flex: '0 0 1px'
    },
    overflow: "visible",
    align: "center",
    justify: "center",
    alignSelf: "stretch"
  }, /*#__PURE__*/React.createElement(VisuallyHiddenInput, {
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
  }), /*#__PURE__*/React.createElement(Box, _extends({
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
export { EdgeControl };