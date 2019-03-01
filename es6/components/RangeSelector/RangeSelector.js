function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { compose } from 'recompose';
import styled from 'styled-components';
import { ThemeContext } from '../../contexts';
import { Box } from '../Box';
import { withForwardRef } from '../hocs';
import { EdgeControl } from './EdgeControl';
var Container = styled(Box).withConfig({
  displayName: "RangeSelector__Container",
  componentId: "siof5p-0"
})(["user-select:none;"]);

var RangeSelector =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(RangeSelector, _Component);

  function RangeSelector() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {});

    _defineProperty(_assertThisInitialized(_this), "containerRef", React.createRef());

    _defineProperty(_assertThisInitialized(_this), "valueForMouseCoord", function (event) {
      var _this$props = _this.props,
          direction = _this$props.direction,
          max = _this$props.max,
          min = _this$props.min,
          step = _this$props.step;

      var rect = _this.containerRef.current.getBoundingClientRect();

      var value;

      if (direction === 'vertical') {
        var y = event.clientY - (rect.y || 0); // unit test resilience

        var scaleY = rect.height / (max - min + 1) || 1; // unit test resilience

        value = Math.floor(y / scaleY) + min;
      } else {
        var x = event.clientX - (rect.x || 0); // unit test resilience

        var scaleX = rect.width / (max - min + 1) || 1; // unit test resilience

        value = Math.floor(x / scaleX) + min;
      } // align with closest step within [min, max]


      var result = value + value % step;

      if (result < min) {
        return min;
      }

      if (result > max) {
        return max;
      }

      return result;
    });

    _defineProperty(_assertThisInitialized(_this), "onClick", function (event) {
      var _this$props2 = _this.props,
          onChange = _this$props2.onChange,
          values = _this$props2.values;
      var lastChange = _this.state.lastChange;

      var value = _this.valueForMouseCoord(event);

      if (value <= values[0] || value < values[1] && lastChange === 'lower') {
        _this.setState({
          lastChange: 'lower'
        }, function () {
          return onChange([value, values[1]]);
        });
      } else if (value >= values[1] || value > values[0] && lastChange === 'upper') {
        _this.setState({
          lastChange: 'upper'
        }, function () {
          return onChange([values[0], value]);
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "lowerMouseDown", function () {
      _this.setState({
        changing: 'lower'
      });

      window.addEventListener('mousemove', _this.mouseMove);
      window.addEventListener('mouseup', _this.mouseUp);
    });

    _defineProperty(_assertThisInitialized(_this), "upperMouseDown", function () {
      _this.setState({
        changing: 'upper'
      });

      window.addEventListener('mousemove', _this.mouseMove);
      window.addEventListener('mouseup', _this.mouseUp);
    });

    _defineProperty(_assertThisInitialized(_this), "selectionMouseDown", function (event) {
      var moveValue = _this.valueForMouseCoord(event);

      _this.setState({
        changing: 'selection',
        moveValue: moveValue
      });

      window.addEventListener('mousemove', _this.mouseMove);
      window.addEventListener('mouseup', _this.mouseUp);
    });

    _defineProperty(_assertThisInitialized(_this), "mouseMove", function (event) {
      var _this$props3 = _this.props,
          max = _this$props3.max,
          min = _this$props3.min,
          onChange = _this$props3.onChange,
          values = _this$props3.values;
      var _this$state = _this.state,
          changing = _this$state.changing,
          moveValue = _this$state.moveValue;

      var value = _this.valueForMouseCoord(event);

      var nextValues;

      if (changing === 'lower' && value <= values[1] && value !== moveValue) {
        nextValues = [value, values[1]];
      } else if (changing === 'upper' && value >= values[0] && value !== moveValue) {
        nextValues = [values[0], value];
      } else if (changing === 'selection' && value !== moveValue) {
        var delta = value - moveValue;

        if (values[0] + delta >= min && values[1] + delta <= max) {
          nextValues = [values[0] + delta, values[1] + delta];
        }
      }

      if (nextValues) {
        _this.setState({
          lastChange: changing,
          moveValue: value
        }, function () {
          onChange(nextValues);
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "mouseUp", function () {
      _this.setState({
        changing: undefined
      });

      window.removeEventListener('mousemove', _this.mouseMove);
      window.removeEventListener('mouseup', _this.mouseMove);
    });

    return _this;
  }

  var _proto = RangeSelector.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener('mousemove', this.mouseMove);
    window.removeEventListener('mouseup', this.mouseMove);
  };

  _proto.render = function render() {
    var _this$props4 = this.props,
        color = _this$props4.color,
        direction = _this$props4.direction,
        forwardRef = _this$props4.forwardRef,
        invert = _this$props4.invert,
        max = _this$props4.max,
        messages = _this$props4.messages,
        min = _this$props4.min,
        onChange = _this$props4.onChange,
        opacity = _this$props4.opacity,
        round = _this$props4.round,
        size = _this$props4.size,
        step = _this$props4.step,
        values = _this$props4.values,
        propsTheme = _this$props4.theme,
        rest = _objectWithoutPropertiesLoose(_this$props4, ["color", "direction", "forwardRef", "invert", "max", "messages", "min", "onChange", "opacity", "round", "size", "step", "values", "theme"]);

    var theme = this.context || propsTheme;
    var _this$state2 = this.state,
        nextLower = _this$state2.nextLower,
        nextUpper = _this$state2.nextUpper;
    var lower = nextLower !== undefined ? nextLower : values[0];
    var upper = nextUpper !== undefined ? nextUpper : values[1]; // It needs to be true when vertical, due to how browsers manage height

    var fill = direction === 'vertical' ? true : 'vertical';
    return React.createElement(Container, _extends({
      ref: this.containerRef,
      direction: direction === 'vertical' ? 'column' : 'row',
      fill: fill
    }, rest, {
      onClick: onChange ? this.onClick : undefined
    }), React.createElement(Box, {
      style: {
        flex: lower - min + " 0 0"
      },
      background: invert ? // preserve existing dark, instead of using darknes of this color
      {
        color: color || theme.rangeSelector.background.invert.color,
        opacity: opacity,
        dark: theme.dark
      } : undefined,
      fill: fill,
      round: round
    }), React.createElement(EdgeControl, {
      a11yTitle: messages.lower,
      tabIndex: 0,
      ref: forwardRef,
      color: color,
      direction: direction,
      edge: "lower",
      onMouseDown: onChange ? this.lowerMouseDown : undefined,
      onDecrease: onChange && lower - step >= min ? function () {
        return onChange([lower - step, upper]);
      } : undefined,
      onIncrease: onChange && lower + step <= upper ? function () {
        return onChange([lower + step, upper]);
      } : undefined
    }), React.createElement(Box, {
      style: {
        flex: upper - lower + 1 + " 0 0",
        cursor: direction === 'vertical' ? 'ns-resize' : 'ew-resize'
      },
      background: invert ? undefined : // preserve existing dark, instead of using darknes of this color
      {
        color: color || 'control',
        opacity: opacity,
        dark: theme.dark
      },
      fill: fill,
      round: round,
      onMouseDown: onChange ? this.selectionMouseDown : undefined
    }), React.createElement(EdgeControl, {
      a11yTitle: messages.upper,
      tabIndex: 0,
      color: color,
      direction: direction,
      edge: "upper",
      onMouseDown: onChange ? this.upperMouseDown : undefined,
      onDecrease: onChange && upper - step >= lower ? function () {
        return onChange([lower, upper - step]);
      } : undefined,
      onIncrease: onChange && upper + step <= max ? function () {
        return onChange([lower, upper + step]);
      } : undefined
    }), React.createElement(Box, {
      style: {
        flex: max - upper + " 0 0"
      },
      background: invert ? // preserve existing dark, instead of using darknes of this color
      {
        color: color || theme.rangeSelector.background.invert.color,
        opacity: opacity,
        dark: theme.dark
      } : undefined,
      fill: fill,
      round: round
    }));
  };

  return RangeSelector;
}(Component);

_defineProperty(RangeSelector, "contextType", ThemeContext);

_defineProperty(RangeSelector, "defaultProps", {
  direction: 'horizontal',
  max: 100,
  messages: {
    lower: 'Lower Bounds',
    upper: 'Upper Bounds'
  },
  min: 0,
  opacity: 'medium',
  size: 'medium',
  step: 1,
  values: []
});

var RangeSelectorDoc;

if (process.env.NODE_ENV !== 'production') {
  RangeSelectorDoc = require('./doc').doc(RangeSelector); // eslint-disable-line global-require
}

var RangeSelectorWrapper = compose(withForwardRef)(RangeSelectorDoc || RangeSelector);
export { RangeSelectorWrapper as RangeSelector };