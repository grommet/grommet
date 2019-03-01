function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { createRef, Component } from 'react';
import { compose } from 'recompose';
import { withTheme } from 'styled-components';
import { normalizeColor, parseMetricToNum } from '../../utils';
import { defaultProps } from '../../default-props';
import { StyledChart } from './StyledChart';
import { normalizeValues, normalizeBounds } from './utils';

var renderBars = function renderBars(values, bounds, scale, height) {
  return (values || []).map(function (valueArg, index) {
    var label = valueArg.label,
        onHover = valueArg.onHover,
        value = valueArg.value,
        rest = _objectWithoutPropertiesLoose(valueArg, ["label", "onHover", "value"]);

    var key = "p-" + index;
    var bottom = value.length === 2 ? bounds[1][0] : value[1];
    var top = value.length === 2 ? value[1] : value[2];

    if (top !== 0) {
      var d = "M " + (value[0] - bounds[0][0]) * scale[0] + "," + ("" + (height - (bottom - bounds[1][0]) * scale[1])) + (" L " + (value[0] - bounds[0][0]) * scale[0] + ",") + ("" + (height - (top - bounds[1][0]) * scale[1]));
      var hoverProps;

      if (onHover) {
        hoverProps = {
          onMouseOver: function onMouseOver() {
            return onHover(true);
          },
          onMouseLeave: function onMouseLeave() {
            return onHover(false);
          }
        };
      }

      return React.createElement("g", {
        key: key,
        fill: "none"
      }, React.createElement("title", null, label), React.createElement("path", _extends({
        d: d
      }, hoverProps, rest)));
    }

    return undefined;
  });
};

var renderLine = function renderLine(values, bounds, scale, height, _ref) {
  var onClick = _ref.onClick,
      onHover = _ref.onHover;
  var d = '';
  (values || []).forEach(function (_ref2, index) {
    var value = _ref2.value;
    d += (index ? ' L' : 'M') + " " + (value[0] - bounds[0][0]) * scale[0] + "," + ("" + (height - (value[1] - bounds[1][0]) * scale[1]));
  });
  var hoverProps;

  if (onHover) {
    hoverProps = {
      onMouseOver: function onMouseOver() {
        return onHover(true);
      },
      onMouseLeave: function onMouseLeave() {
        return onHover(false);
      }
    };
  }

  var clickProps;

  if (onClick) {
    clickProps = {
      onClick: onClick
    };
  }

  return React.createElement("g", {
    fill: "none"
  }, React.createElement("path", _extends({
    d: d
  }, hoverProps, clickProps)));
};

var renderArea = function renderArea(values, bounds, scale, height, _ref3) {
  var color = _ref3.color,
      onClick = _ref3.onClick,
      onHover = _ref3.onHover,
      theme = _ref3.theme;
  var d = '';
  (values || []).forEach(function (_ref4, index) {
    var value = _ref4.value;
    var top = value.length === 2 ? value[1] : value[2];
    d += (!index ? 'M' : ' L') + " " + (value[0] - bounds[0][0]) * scale[0] + "," + ("" + (height - (top - bounds[1][0]) * scale[1]));
  });
  (values || []).reverse().forEach(function (_ref5) {
    var value = _ref5.value;
    var bottom = value.length === 2 ? bounds[1][0] : value[1];
    d += " L " + (value[0] - bounds[0][0]) * scale[0] + "," + ("" + (height - (bottom - bounds[1][0]) * scale[1]));
  });

  if (d.length > 0) {
    d += ' Z';
  }

  var hoverProps;

  if (onHover) {
    hoverProps = {
      onMouseOver: function onMouseOver() {
        return onHover(true);
      },
      onMouseLeave: function onMouseLeave() {
        return onHover(false);
      }
    };
  }

  var clickProps;

  if (onClick) {
    clickProps = {
      onClick: onClick
    };
  }

  return React.createElement("g", {
    fill: normalizeColor(color.color || color, theme)
  }, React.createElement("path", _extends({
    d: d
  }, hoverProps, clickProps)));
};

var Chart =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Chart, _Component);

  function Chart() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "containerRef", createRef());

    _defineProperty(_assertThisInitialized(_this), "state", {
      containerWidth: 0,
      containerHeight: 0
    });

    _defineProperty(_assertThisInitialized(_this), "onResize", function () {
      var containerNode = _this.containerRef.current;

      if (containerNode) {
        var parentNode = containerNode.parentNode;

        if (parentNode) {
          var rect = parentNode.getBoundingClientRect();

          _this.setState({
            containerWidth: rect.width,
            containerHeight: rect.height
          });
        }
      }
    });

    return _this;
  }

  Chart.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var bounds = nextProps.bounds,
        values = nextProps.values;
    var stateBounds = prevState.bounds,
        stateValues = prevState.values;

    if (!stateValues || values !== stateValues || bounds !== stateBounds) {
      var nextValues = normalizeValues(values);
      var nextBounds = normalizeBounds(bounds, nextValues);
      return {
        bounds: nextBounds,
        values: nextValues
      };
    }

    return null;
  };

  var _proto = Chart.prototype;

  _proto.componentDidMount = function componentDidMount() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  };

  _proto.render = function render() {
    var _this$props = this.props,
        color = _this$props.color,
        onClick = _this$props.onClick,
        onHover = _this$props.onHover,
        overflow = _this$props.overflow,
        round = _this$props.round,
        size = _this$props.size,
        theme = _this$props.theme,
        thickness = _this$props.thickness,
        type = _this$props.type,
        rest = _objectWithoutPropertiesLoose(_this$props, ["color", "onClick", "onHover", "overflow", "round", "size", "theme", "thickness", "type"]);

    delete rest.values;
    var _this$state = this.state,
        bounds = _this$state.bounds,
        containerWidth = _this$state.containerWidth,
        containerHeight = _this$state.containerHeight,
        values = _this$state.values;
    var sizeWidth = typeof size === 'string' ? size : size.width || 'medium';
    var sizeHeight = typeof size === 'string' ? size : size.height || 'medium';
    var width = sizeWidth === 'full' ? containerWidth : parseMetricToNum(theme.global.size[sizeWidth] || sizeWidth);
    var height = sizeHeight === 'full' ? containerHeight : parseMetricToNum(theme.global.size[sizeHeight] || sizeHeight);
    var strokeWidth = parseMetricToNum(theme.global.edgeSize[thickness]);
    var scale = [width / (bounds[0][1] - bounds[0][0]), height / (bounds[1][1] - bounds[1][0])];
    var viewBox = overflow ? "0 0 " + width + " " + height : "-" + strokeWidth / 2 + " -" + strokeWidth / 2 + " " + (width + strokeWidth) + " " + (height + strokeWidth);
    var colorName = typeof color === 'object' ? color.color : color;
    var opacity = color.opacity ? theme.global.opacity[color.opacity] : undefined;
    var contents;

    if (type === 'bar') {
      contents = renderBars(values, bounds, scale, height);
    } else if (type === 'line') {
      contents = renderLine(values, bounds, scale, height, this.props);
    } else if (type === 'area') {
      contents = renderArea(values, bounds, scale, height, this.props);
    }

    return React.createElement(StyledChart, _extends({
      ref: this.containerRef,
      viewBox: viewBox,
      preserveAspectRatio: "none",
      width: size === 'full' ? '100%' : width,
      height: size === 'full' ? '100%' : height
    }, rest), React.createElement("g", {
      stroke: normalizeColor(colorName, theme),
      strokeWidth: strokeWidth,
      strokeLinecap: round ? 'round' : 'butt',
      strokeLinejoin: round ? 'round' : 'miter',
      opacity: opacity
    }, contents));
  };

  return Chart;
}(Component);

_defineProperty(Chart, "defaultProps", {
  color: 'accent-1',
  overflow: false,
  size: {
    width: 'medium',
    height: 'small'
  },
  thickness: 'medium',
  type: 'bar'
});

Object.setPrototypeOf(Chart.defaultProps, defaultProps);
var ChartDoc;

if (process.env.NODE_ENV !== 'production') {
  ChartDoc = require('./doc').doc(Chart); // eslint-disable-line global-require
}

var ChartWrapper = compose(withTheme)(ChartDoc || Chart);
export { ChartWrapper as Chart };