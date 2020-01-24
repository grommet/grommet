function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState } from 'react';
import { compose } from 'recompose';
import { withTheme } from 'styled-components';
import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { Keyboard } from '../Keyboard';
import { normalizeColor, parseMetricToNum } from '../../utils';
import { withForwardRef } from '../hocs';
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

var EdgeControl = function EdgeControl(_ref) {
  var color = _ref.color,
      direction = _ref.direction,
      edge = _ref.edge,
      forwardRef = _ref.forwardRef,
      onDecrease = _ref.onDecrease,
      onIncrease = _ref.onIncrease,
      theme = _ref.theme,
      thickness = _ref.thickness,
      rest = _objectWithoutPropertiesLoose(_ref, ["color", "direction", "edge", "forwardRef", "onDecrease", "onIncrease", "theme", "thickness"]);

  var _useState = useState(false),
      focused = _useState[0],
      setFocused = _useState[1];

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

  if (type === 'bar') {
    node = React.createElement(Box, {
      flex: !thickness,
      justifySelf: "stretch",
      width: direction === 'vertical' ? thickness : size + "px",
      height: direction === 'vertical' ? size + "px" : thickness,
      background: normalizeColor(color || 'control', theme),
      border: focused ? {
        color: normalizeColor('focus', theme)
      } : undefined
    });
  } else if (type === 'disc') {
    node = React.createElement(Box, {
      width: size + (focused ? 2 : 0) + "px",
      height: size + (focused ? 2 : 0) + "px",
      round: "full",
      background: normalizeColor(color || 'control', theme),
      border: focused ? {
        color: normalizeColor('focus', theme)
      } : undefined
    });
  } else {
    node = type;
  }

  return React.createElement(Keyboard, keyboardProps, React.createElement(Box, {
    direction: boxDirection,
    style: {
      flex: '0 0 1px'
    },
    overflow: "visible",
    align: "center",
    justify: "center",
    alignSelf: "stretch"
  }, React.createElement(Box, _extends({
    ref: forwardRef,
    direction: boxDirection,
    justify: "center",
    align: "center",
    basis: "full",
    fill: fill,
    style: {
      cursor: cursor,
      minWidth: size,
      minHeight: size,
      zIndex: 10
    },
    tabIndex: 0,
    onFocus: function onFocus() {
      return setFocused(true);
    },
    onBlur: function onBlur() {
      return setFocused(false);
    }
  }, rest), node)));
};

EdgeControl.defaultProps = {};
Object.setPrototypeOf(EdgeControl.defaultProps, defaultProps);
var EdgeControlWrapper = compose(withForwardRef, withTheme)(EdgeControl);
export { EdgeControlWrapper as EdgeControl };