function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef, useContext, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { Keyboard } from '../Keyboard';
import { focusStyle, normalizeColor, parseMetricToNum } from '../../utils';
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
      rest = _objectWithoutPropertiesLoose(_ref, ["color", "direction", "edge", "onDecrease", "onIncrease", "thickness"]);

  var theme = useContext(ThemeContext);

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
EdgeControl.displayName = 'EdgeControl';
EdgeControl.defaultProps = {};
Object.setPrototypeOf(EdgeControl.defaultProps, defaultProps);
export { EdgeControl };