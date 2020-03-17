"use strict";

exports.__esModule = true;
exports.Chart = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = require("styled-components");

var _utils = require("../../utils");

var _StyledChart = require("./StyledChart");

var _utils2 = require("./utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var gradientMaskColor = '#ffffff'; // use constants so re-renders don't re-trigger effects

var defaultSize = {
  height: 'small',
  width: 'medium'
};
var defaultValues = [];

var Chart = _react["default"].forwardRef(function (_ref, ref) {
  var propsBounds = _ref.bounds,
      color = _ref.color,
      dash = _ref.dash,
      gap = _ref.gap,
      id = _ref.id,
      onClick = _ref.onClick,
      onHover = _ref.onHover,
      _ref$overflow = _ref.overflow,
      overflow = _ref$overflow === void 0 ? false : _ref$overflow,
      round = _ref.round,
      _ref$size = _ref.size,
      propsSize = _ref$size === void 0 ? defaultSize : _ref$size,
      _ref$thickness = _ref.thickness,
      thickness = _ref$thickness === void 0 ? 'medium' : _ref$thickness,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'bar' : _ref$type,
      _ref$values = _ref.values,
      propsValues = _ref$values === void 0 ? defaultValues : _ref$values,
      rest = _objectWithoutPropertiesLoose(_ref, ["bounds", "color", "dash", "gap", "id", "onClick", "onHover", "overflow", "round", "size", "thickness", "type", "values"]);

  var theme = (0, _react.useContext)(_styledComponents.ThemeContext);

  var _useState = (0, _react.useState)([]),
      values = _useState[0],
      setValues = _useState[1];

  var _useState2 = (0, _react.useState)([[0, 0], [0, 0]]),
      bounds = _useState2[0],
      setBounds = _useState2[1];

  var _useState3 = (0, _react.useState)([0, 0]),
      containerSize = _useState3[0],
      setContainerSize = _useState3[1];

  var _useState4 = (0, _react.useState)([0, 0]),
      size = _useState4[0],
      setSize = _useState4[1];

  var _useState5 = (0, _react.useState)([1, 1]),
      scale = _useState5[0],
      setScale = _useState5[1];

  var _useState6 = (0, _react.useState)(0),
      strokeWidth = _useState6[0],
      setStrokeWidth = _useState6[1];

  var containerRef = ref || (0, _react.useRef)(); // calculations

  (0, _react.useEffect)(function () {
    var nextValues = (0, _utils2.normalizeValues)(propsValues);
    setValues(nextValues);
    var nextBounds = (0, _utils2.normalizeBounds)(propsBounds, nextValues);
    setBounds(nextBounds);
    var nextStrokeWidth = (0, _utils.parseMetricToNum)(theme.global.edgeSize[thickness] || thickness);
    setStrokeWidth(nextStrokeWidth);
    var gapWidth = gap ? (0, _utils.parseMetricToNum)(theme.global.edgeSize[gap] || gap) : nextStrokeWidth; // autoWidth is how wide we'd pefer

    var autoWidth = nextStrokeWidth * nextValues.length + (nextValues.length - 1) * gapWidth;
    var sizeWidth = typeof propsSize === 'string' ? propsSize : propsSize.width || defaultSize.width;
    var width;

    if (sizeWidth === 'full') {
      width = containerSize[0];
    } else if (sizeWidth === 'auto') {
      width = autoWidth;
    } else {
      width = (0, _utils.parseMetricToNum)(theme.global.size[sizeWidth] || sizeWidth);
    }

    var sizeHeight = typeof propsSize === 'string' ? propsSize : propsSize.height || defaultSize.height;
    var height;

    if (sizeHeight === 'full') {
      height = containerSize[1];
    } else {
      height = (0, _utils.parseMetricToNum)(theme.global.size[sizeHeight] || sizeHeight);
    }

    setSize([width, height]);
    var nextScale = [(sizeWidth === 'auto' ? autoWidth : width) / (nextBounds[0][1] - nextBounds[0][0]), height / (nextBounds[1][1] - nextBounds[1][0])];
    setScale(nextScale);
  }, [containerSize, gap, propsBounds, propsSize, propsValues, theme.global.edgeSize, theme.global.size, thickness]); // set container size when we get ref or when size changes

  if (containerRef.current && propsSize && (propsSize === 'full' || propsSize.height === 'full' || propsSize.width === 'full')) {
    var containerNode = containerRef.current;

    if (containerNode) {
      var parentNode = containerNode.parentNode;

      if (parentNode) {
        var rect = parentNode.getBoundingClientRect();

        if (rect.width !== containerSize[0] || rect.height !== containerSize[1]) {
          setContainerSize([rect.width, rect.height]);
        }
      }
    }
  } // container size, if needed


  (0, _react.useEffect)(function () {
    var onResize = function onResize() {
      var parentNode = containerRef.current.parentNode;
      var rect = parentNode.getBoundingClientRect();
      setContainerSize([rect.width, rect.height]);
    };

    if (propsSize && (propsSize === 'full' || propsSize.width === 'full' || propsSize.height === 'full')) {
      window.addEventListener('resize', onResize);
      return function () {
        return window.removeEventListener('resize', onResize);
      };
    }

    return undefined;
  }, [containerRef, propsSize]);
  var useGradient = color && Array.isArray(color);
  var strokeDasharray;

  if (dash) {
    if (round) {
      strokeDasharray = strokeWidth + " " + strokeWidth * 1.5;
    } else {
      strokeDasharray = strokeWidth * 2 + " " + strokeWidth / 2;
    }
  }

  var renderBars = function renderBars() {
    return (values || []).map(function (valueArg, index) {
      var label = valueArg.label,
          valueOnHover = valueArg.onHover,
          value = valueArg.value,
          valueRest = _objectWithoutPropertiesLoose(valueArg, ["label", "onHover", "value"]);

      var key = "p-" + index;
      var bottom = value.length === 2 ? bounds[1][0] : value[1];
      var top = value.length === 2 ? value[1] : value[2];

      if (top !== 0) {
        var d = "M " + (value[0] - bounds[0][0]) * scale[0] + "," + ("" + (size[1] - (bottom - bounds[1][0]) * scale[1])) + (" L " + (value[0] - bounds[0][0]) * scale[0] + ",") + ("" + (size[1] - (top - bounds[1][0]) * scale[1]));
        var hoverProps;

        if (valueOnHover) {
          hoverProps = {
            onMouseOver: function onMouseOver() {
              return valueOnHover(true);
            },
            onMouseLeave: function onMouseLeave() {
              return valueOnHover(false);
            }
          };
        }

        var clickProps;

        if (onClick) {
          clickProps = {
            onClick: onClick
          };
        }

        return _react["default"].createElement("g", {
          key: key,
          fill: "none"
        }, _react["default"].createElement("title", null, label), _react["default"].createElement("path", _extends({
          d: d
        }, hoverProps, clickProps, valueRest, {
          strokeDasharray: strokeDasharray
        })));
      }

      return undefined;
    });
  };

  var renderLine = function renderLine() {
    var d = '';
    (values || []).forEach(function (_ref2, index) {
      var value = _ref2.value;
      d += (index ? ' L' : 'M') + " " + (value[0] - bounds[0][0]) * scale[0] + "," + ("" + (size[1] - (value[1] - bounds[1][0]) * scale[1]));
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

    return _react["default"].createElement("g", {
      fill: "none"
    }, _react["default"].createElement("path", _extends({
      d: d
    }, hoverProps, clickProps, {
      strokeDasharray: strokeDasharray
    })));
  };

  var renderArea = function renderArea() {
    var d = '';
    (values || []).forEach(function (_ref3, index) {
      var value = _ref3.value;
      var top = value.length === 2 ? value[1] : value[2];
      d += (!index ? 'M' : ' L') + " " + (value[0] - bounds[0][0]) * scale[0] + "," + ("" + (size[1] - (top - bounds[1][0]) * scale[1]));
    });
    (values || []).reverse().forEach(function (_ref4) {
      var value = _ref4.value;
      var bottom = value.length === 2 ? bounds[1][0] : value[1];
      d += " L " + (value[0] - bounds[0][0]) * scale[0] + "," + ("" + (size[1] - (bottom - bounds[1][0]) * scale[1]));
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

    return _react["default"].createElement("g", null, _react["default"].createElement("path", _extends({
      d: d
    }, hoverProps, clickProps)));
  };

  var renderPoints = function renderPoints() {
    return (values || []).map(function (valueArg, index) {
      var label = valueArg.label,
          valueOnHover = valueArg.onHover,
          value = valueArg.value,
          valueRest = _objectWithoutPropertiesLoose(valueArg, ["label", "onHover", "value"]);

      var key = "p-" + index;
      var hoverProps;

      if (valueOnHover) {
        hoverProps = {
          onMouseOver: function onMouseOver() {
            return valueOnHover(true);
          },
          onMouseLeave: function onMouseLeave() {
            return valueOnHover(false);
          }
        };
      }

      var clickProps;

      if (onClick) {
        clickProps = {
          onClick: onClick
        };
      }

      var center = value.length === 2 ? value[1] : value[2];
      var shape;

      if (round) {
        var cx = (value[0] - bounds[0][0]) * scale[0];
        var cy = size[1] - (center - bounds[1][0]) * scale[1];
        shape = _react["default"].createElement("circle", _extends({
          cx: cx,
          cy: cy,
          r: strokeWidth / 2
        }, hoverProps, clickProps, valueRest));
      } else {
        var x = (value[0] - bounds[0][0]) * scale[0] - strokeWidth / 2;
        var y = size[1] - (center - bounds[1][0]) * scale[1] - strokeWidth / 2;
        shape = _react["default"].createElement("rect", _extends({
          x: x,
          y: y,
          width: strokeWidth,
          height: strokeWidth
        }, hoverProps, clickProps, valueRest));
      }

      return _react["default"].createElement("g", {
        key: key,
        stroke: "none"
      }, _react["default"].createElement("title", null, label), shape);
    });
  };

  var contents;

  if (type === 'bar') {
    contents = renderBars();
  } else if (type === 'line') {
    contents = renderLine();
  } else if (type === 'area') {
    contents = renderArea();
  } else if (type === 'point') {
    contents = renderPoints();
  }

  var viewBounds = overflow ? [0, 0, size[0], size[1]] : [-(strokeWidth / 2), -(strokeWidth / 2), size[0] + strokeWidth, size[1] + strokeWidth];
  var viewBox = viewBounds.join(' ');
  var colorName;

  if (!useGradient) {
    if (color && color.color) colorName = color.color;else if (color) colorName = color;else if (theme.chart && theme.chart.color) colorName = theme.chart.color;
  }

  var opacity = color && color.opacity ? theme.global.opacity[color.opacity] : undefined;
  var stroke;

  if (type !== 'point') {
    if (useGradient) stroke = gradientMaskColor;else stroke = (0, _utils.normalizeColor)(colorName, theme);
  } else stroke = 'none';

  var fill;

  if (type === 'point' || type === 'area') {
    if (useGradient) fill = gradientMaskColor;else fill = (0, _utils.normalizeColor)(colorName, theme);
  } else fill = 'none';

  var drawing = _react["default"].createElement("g", {
    stroke: stroke,
    strokeWidth: type !== 'point' ? strokeWidth : undefined,
    fill: fill,
    strokeLinecap: round ? 'round' : 'butt',
    strokeLinejoin: round ? 'round' : 'miter',
    opacity: opacity
  }, contents);

  var defs;
  var gradientRect;

  if (useGradient && size[1]) {
    var gradientId = id + "-gradient";
    var maskId = id + "-mask";
    defs = _react["default"].createElement("defs", null, _react["default"].createElement("linearGradient", {
      id: gradientId,
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 1
    }, color.sort(function (c1, c2) {
      return c2.value - c1.value;
    }).map(function (_ref5) {
      var value = _ref5.value,
          gradientColor = _ref5.color;
      return _react["default"].createElement("stop", {
        key: value,
        offset: (size[1] - (value - bounds[1][0]) * scale[1]) / size[1],
        stopColor: (0, _utils.normalizeColor)(gradientColor, theme)
      });
    })), _react["default"].createElement("mask", {
      id: maskId
    }, drawing));
    gradientRect = _react["default"].createElement("rect", {
      x: viewBounds[0],
      y: viewBounds[1],
      width: viewBounds[2],
      height: viewBounds[3],
      fill: "url(#" + gradientId + ")",
      mask: "url(#" + maskId + ")"
    });
  }

  return _react["default"].createElement(_StyledChart.StyledChart, _extends({
    ref: containerRef,
    id: id,
    viewBox: viewBox,
    preserveAspectRatio: "none",
    width: size === 'full' ? '100%' : size[0],
    height: size === 'full' ? '100%' : size[1]
  }, rest), defs, useGradient ? gradientRect : drawing);
});

Chart.displayName = 'Chart';
var ChartDoc;

if (process.env.NODE_ENV !== 'production') {
  ChartDoc = require('./doc').doc(Chart); // eslint-disable-line global-require
}

var ChartWrapper = ChartDoc || Chart;
exports.Chart = ChartWrapper;