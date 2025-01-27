var _excluded = ["color", "direction", "edge", "onDecrease", "onIncrease", "thickness"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { forwardRef, useState } from 'react';
import styled from 'styled-components';
import { Box } from '../Box';
import { Keyboard } from '../Keyboard';
import { focusStyle, normalizeColor, parseMetricToNum } from '../../utils';
import { useThemeValue } from '../../utils/useThemeValue';
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
  componentId: "sc-1xo2yt9-0"
})(["", ""], function (props) {
  return props.focus && focusStyle();
});
var EdgeControl = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var color = _ref.color,
    direction = _ref.direction,
    edge = _ref.edge,
    onDecrease = _ref.onDecrease,
    onIncrease = _ref.onIncrease,
    thickness = _ref.thickness,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme;
  var _useState = useState(false),
    focus = _useState[0],
    setFocus = _useState[1];
  var _DIRECTION_PROPS$dire = DIRECTION_PROPS[direction],
    cursor = _DIRECTION_PROPS$dire.cursor,
    fill = _DIRECTION_PROPS$dire.fill;
  var size = parseMetricToNum(theme.global.spacing) / 2;
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
  }, /*#__PURE__*/React.createElement(Box, _extends({
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
    tabIndex: 0,
    onFocus: function onFocus() {
      return setFocus(true);
    },
    onBlur: function onBlur() {
      return setFocus(false);
    }
  }, rest), node)));
});
EdgeControl.displayName = 'EdgeControl';
export { EdgeControl };