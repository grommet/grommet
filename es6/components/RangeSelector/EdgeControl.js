function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
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

var EdgeControl =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(EdgeControl, _Component);

  function EdgeControl() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {});

    return _this;
  }

  var _proto = EdgeControl.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        color = _this$props.color,
        direction = _this$props.direction,
        edge = _this$props.edge,
        forwardRef = _this$props.forwardRef,
        onDecrease = _this$props.onDecrease,
        onIncrease = _this$props.onIncrease,
        theme = _this$props.theme,
        rest = _objectWithoutPropertiesLoose(_this$props, ["color", "direction", "edge", "forwardRef", "onDecrease", "onIncrease", "theme"]);

    var focused = this.state.focused;
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
        flex: true,
        justifySelf: "stretch",
        width: size + "px",
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
      justify: "center"
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
      onFocus: function onFocus() {
        return _this2.setState({
          focused: true
        });
      },
      onBlur: function onBlur() {
        return _this2.setState({
          focused: false
        });
      }
    }, rest), node)));
  };

  return EdgeControl;
}(Component);

EdgeControl.defaultProps = {};
Object.setPrototypeOf(EdgeControl.defaultProps, defaultProps);
var EdgeControlWrapper = compose(withForwardRef, withTheme)(EdgeControl);
export { EdgeControlWrapper as EdgeControl };