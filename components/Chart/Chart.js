"use strict";

exports.__esModule = true;
exports.Chart = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = require("styled-components");
var _useIsomorphicLayoutEffect = require("../../utils/use-isomorphic-layout-effect");
var _defaultProps = require("../../default-props");
var _utils = require("../../utils");
var _StyledChart = require("./StyledChart");
var _utils2 = require("./utils");
var _propTypes = require("./propTypes");
var _excluded = ["a11yTitle", "bounds", "color", "dash", "direction", "gap", "id", "onClick", "onHover", "opacity", "overflow", "pad", "pattern", "point", "round", "size", "thickness", "type", "values"],
  _excluded2 = ["color", "label", "onHover", "opacity", "thickness", "value"],
  _excluded3 = ["color", "label", "onHover", "opacity", "thickness", "value"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var gradientMaskColor = '#ffffff';

// use constants so re-renders don't re-trigger effects
var defaultSize = {
  height: 'small',
  width: 'medium'
};
var defaultValues = [];
var Chart = exports.Chart = /*#__PURE__*/_react["default"].forwardRef(function (_ref, ref) {
  var a11yTitle = _ref.a11yTitle,
    boundsProp = _ref.bounds,
    color = _ref.color,
    dash = _ref.dash,
    _ref$direction = _ref.direction,
    direction = _ref$direction === void 0 ? 'vertical' : _ref$direction,
    gap = _ref.gap,
    id = _ref.id,
    onClick = _ref.onClick,
    onHover = _ref.onHover,
    opacityProp = _ref.opacity,
    _ref$overflow = _ref.overflow,
    overflow = _ref$overflow === void 0 ? false : _ref$overflow,
    pad = _ref.pad,
    pattern = _ref.pattern,
    point = _ref.point,
    round = _ref.round,
    sizeProp = _ref.size,
    _ref$thickness = _ref.thickness,
    thickness = _ref$thickness === void 0 ? 'medium' : _ref$thickness,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'bar' : _ref$type,
    _ref$values = _ref.values,
    valuesProp = _ref$values === void 0 ? defaultValues : _ref$values,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var containerRef = (0, _utils.useForwardedRef)(ref);
  var theme = (0, _react.useContext)(_styledComponents.ThemeContext) || _defaultProps.defaultProps.theme;
  var values = (0, _react.useMemo)(function () {
    return (0, _utils2.normalizeValues)(valuesProp);
  }, [valuesProp]);
  var horizontal = (0, _react.useMemo)(function () {
    return direction === 'horizontal';
  }, [direction]);

  // bounds is { x: { min, max }, y: { min, max } }
  var bounds = (0, _react.useMemo)(function () {
    return (0, _utils2.normalizeBounds)(boundsProp, values, direction);
  }, [direction, boundsProp, values]);
  var strokeWidth = (0, _react.useMemo)(function () {
    return (0, _utils.parseMetricToNum)(theme.global.edgeSize[thickness] || thickness);
  }, [theme.global.edgeSize, thickness]);

  // inset is { top, left, bottom, right }
  var inset = (0, _react.useMemo)(function () {
    var result = {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    };
    if (pad) {
      if (pad.horizontal) {
        var padSize = (0, _utils.parseMetricToNum)(theme.global.edgeSize[pad.horizontal] || pad.horizontal);
        result.left = padSize;
        result.right = padSize;
      }
      if (pad.vertical) {
        var _padSize = (0, _utils.parseMetricToNum)(theme.global.edgeSize[pad.vertical] || pad.vertical);
        result.top = _padSize;
        result.bottom = _padSize;
      }
      if (pad.start) {
        result.left = (0, _utils.parseMetricToNum)(theme.global.edgeSize[pad.start] || pad.start);
      }
      if (pad.end) {
        result.right = (0, _utils.parseMetricToNum)(theme.global.edgeSize[pad.end] || pad.end);
      }
      if (typeof pad === 'string') {
        var _padSize2 = (0, _utils.parseMetricToNum)(theme.global.edgeSize[pad]);
        result.top = _padSize2;
        result.left = _padSize2;
        result.bottom = _padSize2;
        result.right = _padSize2;
      }
    }
    return result;
  }, [pad, theme.global.edgeSize]);
  var strokeDasharray = (0, _react.useMemo)(function () {
    if (dash) {
      if (round) return strokeWidth + " " + strokeWidth * 1.5;
      return strokeWidth * 2 + " " + strokeWidth / 2;
    }
    return undefined;
  }, [dash, round, strokeWidth]);

  // potentially dynamic sizing

  var _useState = (0, _react.useState)([0, 0]),
    containerSize = _useState[0],
    setContainerSize = _useState[1];
  var needContainerSize = (0, _react.useMemo)(function () {
    return sizeProp && (sizeProp === 'full' || sizeProp === 'fill' || sizeProp.height === 'full' || sizeProp.height === 'fill' || sizeProp.width === 'full' || sizeProp.width === 'fill');
  }, [sizeProp]);

  // size is { width, height }
  var size = (0, _react.useMemo)(function () {
    var gapWidth = gap ? (0, _utils.parseMetricToNum)(theme.global.edgeSize[gap] || gap) : strokeWidth;

    // autoSize is how wide or tall we'd pefer based on the number of values
    var autoSize = strokeWidth * values.length + (values.length - 1) * gapWidth;
    var sizeWidth = typeof sizeProp === 'string' ? sizeProp : (sizeProp == null ? void 0 : sizeProp.width) || horizontal && defaultSize.height || defaultSize.width;
    var width;
    if (sizeWidth === 'full' || sizeWidth === 'fill') {
      width = containerSize[0];
    } else if (sizeWidth === 'auto') {
      width = autoSize;
    } else {
      width = (0, _utils.parseMetricToNum)(theme.global.size[sizeWidth] || sizeWidth);
    }
    var sizeHeight = typeof sizeProp === 'string' ? sizeProp : (sizeProp == null ? void 0 : sizeProp.height) || horizontal && defaultSize.width || defaultSize.height;
    var height;
    if (sizeHeight === 'full' || sizeHeight === 'fill') {
      height = containerSize[1];
    } else if (sizeHeight === 'auto') {
      height = autoSize;
    } else {
      height = (0, _utils.parseMetricToNum)(theme.global.size[sizeHeight] || sizeHeight);
    }
    return {
      width: width,
      height: height
    };
  }, [containerSize, gap, horizontal, sizeProp, strokeWidth, theme.global.edgeSize, theme.global.size, values]);

  // scale is { x, y }
  var scale = (0, _react.useMemo)(function () {
    return {
      x: (size.width - (inset.left + inset.right)) / (bounds.x.max - bounds.x.min),
      y: (size.height - (inset.top + inset.bottom)) / (bounds.y.max - bounds.y.min)
    };
  }, [bounds, inset, size]);
  var viewBoxBounds = (0, _react.useMemo)(function () {
    if (overflow) {
      return [0, 0, size.width, size.height];
    }
    return [-(strokeWidth / 2), -(strokeWidth / 2), size.width + strokeWidth, size.height + strokeWidth];
  }, [overflow, size, strokeWidth]);

  // set container size when we get ref or when size changes
  (0, _useIsomorphicLayoutEffect.useLayoutEffect)(function () {
    if (containerRef.current && needContainerSize) {
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
    }
  }, [containerRef, containerSize, needContainerSize]);

  // container size, if needed
  (0, _react.useEffect)(function () {
    var onResize = function onResize() {
      var parentNode = containerRef.current.parentNode;
      var rect = parentNode.getBoundingClientRect();
      setContainerSize([rect.width, rect.height]);
    };
    if (needContainerSize) {
      window.addEventListener('resize', onResize);
      return function () {
        return window.removeEventListener('resize', onResize);
      };
    }
    return undefined;
  }, [containerRef, needContainerSize]);

  // rendering helpers, to make rendering code easier to understand

  var valueCoords = function valueCoords(x, y) {
    return horizontal ? [y, x] : [x, y];
  };

  // Converts values to drawing coordinates.
  // Takes into account the bounds, any inset, and the scale.
  var valueToCoordinate = function valueToCoordinate(xValue, yValue) {
    var y = (yValue - bounds.y.min) * scale.y + inset.top;
    return [(xValue - bounds.x.min) * scale.x + inset.left,
    // horizontal grows y top down, vertical grows y bottom up
    horizontal ? y : size.height - y];
  };
  var useGradient = color && Array.isArray(color);
  var patternId;
  function getOpacity(valueOpacity) {
    return valueOpacity && theme.global.opacity[valueOpacity] || (
    // eslint-disable-next-line no-nested-ternary
    valueOpacity === true ? theme.global.opacity.medium : valueOpacity === false ? undefined : valueOpacity);
  }
  var renderBars = function renderBars() {
    return (values || []).filter(function (_ref2) {
      var value = _ref2.value;
      return value[1] !== undefined;
    }).map(function (valueArg, index) {
      var valueColor = valueArg.color,
        label = valueArg.label,
        valueOnHover = valueArg.onHover,
        valueOpacity = valueArg.opacity,
        valueThickness = valueArg.thickness,
        value = valueArg.value,
        valueRest = _objectWithoutPropertiesLoose(valueArg, _excluded2);
      var key = "p-" + index;
      // Math.min/max are to handle negative values
      var _valueCoords = valueCoords(value[0], value.length === 2 ? Math.min(Math.max(0, horizontal ? bounds.x.min : bounds.y.min), value[1]) : Math.min(value[1], value[2])),
        startX = _valueCoords[0],
        startY = _valueCoords[1];
      var _valueCoords2 = valueCoords(value[0], value.length === 2 ? Math.max(Math.min(0, horizontal ? bounds.x.max : bounds.y.max), value[1]) : Math.max(value[1], value[2])),
        endX = _valueCoords2[0],
        endY = _valueCoords2[1];
      var d = "M " + valueToCoordinate(startX, startY).join(',') + (" L " + valueToCoordinate(endX, endY).join(','));
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
      return /*#__PURE__*/_react["default"].createElement("g", {
        key: key,
        fill: "none",
        stroke: valueColor ? (0, _utils.normalizeColor)(valueColor, theme) : undefined,
        strokeWidth: valueThickness ? (0, _utils.parseMetricToNum)(theme.global.edgeSize[valueThickness] || valueThickness) : undefined,
        opacity: getOpacity(valueOpacity)
      }, /*#__PURE__*/_react["default"].createElement("title", null, label), /*#__PURE__*/_react["default"].createElement("path", _extends({
        d: d
      }, hoverProps, clickProps, valueRest, {
        strokeDasharray: strokeDasharray
      })));
    });
  };
  var renderLine = function renderLine() {
    var d = '';
    var d2 = '';
    (values || []).filter(function (_ref3) {
      var value = _ref3.value;
      return value[1] !== undefined;
    }).forEach(function (_ref4) {
      var value = _ref4.value;
      var _valueCoords3 = valueCoords(value[0], value[1]),
        x = _valueCoords3[0],
        y = _valueCoords3[1];
      d += (d ? ' L' : 'M') + " " + valueToCoordinate(x, y).join(',');
      if (value[2] !== undefined) {
        var _valueCoords4 = valueCoords(value[0], value[2]),
          x2 = _valueCoords4[0],
          y2 = _valueCoords4[1];
        d2 += (d2 ? ' L' : 'M') + " " + valueToCoordinate(x2, y2).join(',');
      }
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
    return /*#__PURE__*/_react["default"].createElement("g", {
      fill: "none"
    }, /*#__PURE__*/_react["default"].createElement("path", _extends({
      d: d
    }, hoverProps, clickProps, {
      strokeDasharray: strokeDasharray
    })), d2 && /*#__PURE__*/_react["default"].createElement("path", _extends({
      d: d2
    }, hoverProps, clickProps, {
      strokeDasharray: strokeDasharray
    })));
  };
  var renderArea = function renderArea() {
    var d = '';
    (values || []).filter(function (_ref5) {
      var value = _ref5.value;
      return value[1] !== undefined;
    }).forEach(function (_ref6, index) {
      var value = _ref6.value;
      var _valueCoords5 = valueCoords(value[0],
        // when a range, second value is on top
        value[value.length === 2 ? 1 : 2]),
        x = _valueCoords5[0],
        y = _valueCoords5[1];
      d += (!index ? 'M' : ' L') + " " + valueToCoordinate(x, y).join(',');
    });
    (values || []).filter(function (_ref7) {
      var value = _ref7.value;
      return value[1] !== undefined;
    }).reverse().forEach(function (_ref8) {
      var value = _ref8.value;
      var _valueCoords6 = valueCoords(value[0],
        // Math.max() is to account for value[1] being negative
        value.length === 2 ? Math.max(0, horizontal ? bounds.x.min : bounds.y.min) : value[1]),
        x = _valueCoords6[0],
        y = _valueCoords6[1];
      d += " L " + valueToCoordinate(x, y).join(',');
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
    patternId = pattern && pattern + "-" + id + "-pattern";
    return /*#__PURE__*/_react["default"].createElement("g", null, /*#__PURE__*/_react["default"].createElement("path", _extends({
      d: d,
      fill: patternId ? "url(#" + patternId + ")" : undefined
    }, hoverProps, clickProps)));
  };
  var renderPoints = function renderPoints() {
    return (values || []).filter(function (_ref9) {
      var value = _ref9.value;
      return value[1] !== undefined;
    }).map(function (valueArg, index) {
      var valueColor = valueArg.color,
        label = valueArg.label,
        valueOnHover = valueArg.onHover,
        valueOpacity = valueArg.opacity,
        valueThickness = valueArg.thickness,
        value = valueArg.value,
        valueRest = _objectWithoutPropertiesLoose(valueArg, _excluded3);
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
      var width = valueThickness ? (0, _utils.parseMetricToNum)(theme.global.edgeSize[valueThickness] || valueThickness) : strokeWidth;
      var renderPoint = function renderPoint(valueX, valueY) {
        var props = _extends({}, hoverProps, clickProps, valueRest);
        var _valueCoords7 = valueCoords(valueX, valueY),
          x = _valueCoords7[0],
          y = _valueCoords7[1];
        var _valueToCoordinate = valueToCoordinate(x, y),
          cx = _valueToCoordinate[0],
          cy = _valueToCoordinate[1];
        var off = width / 2;
        if (point === 'circle' || !point && round) return /*#__PURE__*/_react["default"].createElement("circle", _extends({
          cx: cx,
          cy: cy,
          r: off
        }, props));
        var d;
        if (point === 'diamond') d = "M " + cx + " " + (cy - off) + " L " + (cx + off) + " " + cy + " L " + cx + " " + (cy + off) + " L " + (cx - off) + " " + cy + " Z";else if (point === 'star') {
          var off1 = off / 3;
          var off2 = off1 * 2;
          d = "M " + cx + " " + (cy - off) + " L " + (cx - off2) + " " + (cy + off) + " L " + (cx + off) + " " + (cy - off1) + " L " + (cx - off) + " " + (cy - off1) + " L " + (cx + off2) + " " + (cy + off) + " Z";
        } else if (point === 'triangle') d = "M " + cx + " " + (cy - off) + " L " + (cx + off) + " " + (cy + off) + " L " + (cx - off) + " " + (cy + off) + " Z";else if (point === 'triangleDown') d = "M " + (cx - off) + " " + (cy - off) + " L " + (cx + off) + " " + (cy - off) + " L " + cx + " " + (cy + off) + " Z";
        // square
        else d = "M " + (cx - off) + " " + (cy - off) + " L " + (cx + off) + " " + (cy - off) + " L " + (cx + off) + " " + (cy + off) + " L " + (cx - off) + " " + (cy + off) + " Z";
        return /*#__PURE__*/_react["default"].createElement("path", {
          d: d
        });
      };
      return /*#__PURE__*/_react["default"].createElement("g", {
        key: key,
        stroke: "none",
        fill: valueColor ? (0, _utils.normalizeColor)(valueColor, theme) : undefined,
        opacity: getOpacity(valueOpacity)
      }, /*#__PURE__*/_react["default"].createElement("title", null, label), renderPoint(value[0], value[1]), value[2] !== undefined && renderPoint(value[0], value[2]));
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
  var viewBox = viewBoxBounds.join(' ');
  var colorName;
  if (!useGradient) {
    if (color && color.color) colorName = color.color;else if (color) colorName = color;else if (theme.chart && theme.chart.color) colorName = theme.chart.color;
  }
  var opacity;
  if (opacityProp === true) {
    opacity = theme.global.opacity.medium;
  } else if (opacityProp) {
    opacity = theme.global.opacity[opacityProp] ? theme.global.opacity[opacityProp] : opacityProp;
  } else if (color && color.opacity) {
    opacity = theme.global.opacity[color.opacity] ? theme.global.opacity[color.opacity] : color.opacity;
  } else opacity = undefined;
  var stroke;
  if (type !== 'point') {
    if (useGradient) stroke = gradientMaskColor;else stroke = (0, _utils.normalizeColor)(colorName, theme);
  } else stroke = 'none';
  var fill;
  if (type === 'point' || type === 'area') {
    if (useGradient) fill = gradientMaskColor;else fill = (0, _utils.normalizeColor)(colorName, theme);
  } else fill = 'none';
  var drawing = /*#__PURE__*/_react["default"].createElement("g", {
    stroke: stroke,
    strokeWidth: type !== 'point' && (type !== 'area' || !pattern) ? strokeWidth : undefined,
    fill: fill,
    strokeLinecap: round ? 'round' : 'butt',
    strokeLinejoin: round ? 'round' : 'miter',
    opacity: opacity
  }, contents);
  var defs = [];
  var gradientRect;
  if (useGradient && (horizontal && size.width || size.height)) {
    var uniqueGradientId = color.map(function (element) {
      return element.color;
    }).join('-');
    var gradientId = uniqueGradientId + "-" + id + "-gradient";
    var maskId = uniqueGradientId + "-" + id + "-mask";
    defs.push( /*#__PURE__*/_react["default"].createElement("linearGradient", {
      key: "gradientId",
      id: gradientId,
      x1: 0,
      y1: 0,
      x2: horizontal ? 1 : 0,
      y2: horizontal ? 0 : 1
    }, color.slice(0).sort(function (c1, c2) {
      return horizontal ? c1.value - c2.value : c2.value - c1.value;
    }).map(function (_ref10) {
      var value = _ref10.value,
        gradientColor = _ref10.color;
      return /*#__PURE__*/_react["default"].createElement("stop", {
        key: value,
        offset: horizontal ? (value - bounds.x.min) * scale.x / size.width : (size.height - (value - bounds.y.min) * scale.y) / size.height,
        stopColor: (0, _utils.normalizeColor)(gradientColor, theme)
      });
    })));
    defs.push( /*#__PURE__*/_react["default"].createElement("mask", {
      key: "mask",
      id: maskId
    }, drawing));
    gradientRect = /*#__PURE__*/_react["default"].createElement("rect", {
      x: viewBoxBounds[0],
      y: viewBoxBounds[1],
      width: viewBoxBounds[2],
      height: viewBoxBounds[3],
      fill: "url(#" + gradientId + ")",
      mask: "url(#" + maskId + ")"
    });
  } else if (patternId) {
    var content;
    var diagonal = pattern.match(/Diagonal/);
    var unit = diagonal ? strokeWidth * Math.sqrt(2) : strokeWidth;
    var half = unit / 2;
    var _double = unit * 2;
    var pColor = (0, _utils.normalizeColor)(colorName, theme);
    if (pattern === 'squares') {
      content = /*#__PURE__*/_react["default"].createElement("rect", {
        x: half,
        y: half,
        width: unit,
        height: unit,
        fill: pColor
      });
    } else if (pattern === 'circles') {
      content = /*#__PURE__*/_react["default"].createElement("circle", {
        cx: unit,
        cy: unit,
        r: half,
        fill: pColor
      });
    } else if (pattern === 'stripesHorizontal') {
      content = /*#__PURE__*/_react["default"].createElement("path", {
        d: "M 0 " + unit + " L " + _double + " " + unit,
        stroke: pColor,
        strokeWidth: strokeWidth
      });
    } else if (pattern === 'stripesVertical') {
      content = /*#__PURE__*/_react["default"].createElement("path", {
        d: "M " + unit + " 0 L " + unit + " " + _double,
        stroke: pColor,
        strokeWidth: strokeWidth
      });
    } else if (pattern === 'stripesDiagonalDown') {
      content = /*#__PURE__*/_react["default"].createElement("path", {
        d: "M " + half + " " + -half + " L " + (_double + half) + " " + (_double - half) + "\n              M " + -half + " " + half + " L " + (_double - half) + " " + (_double + half),
        stroke: pColor,
        strokeWidth: strokeWidth
      });
    } else if (pattern === 'stripesDiagonalUp') {
      content = /*#__PURE__*/_react["default"].createElement("path", {
        d: "M " + -half + " " + (_double - half) + " L " + (_double - half) + " " + -half + "\n              M " + half + " " + (_double + half) + " L " + (_double + half) + " " + half,
        stroke: pColor,
        strokeWidth: strokeWidth
      });
    }
    defs.push( /*#__PURE__*/_react["default"].createElement("pattern", {
      key: patternId,
      id: patternId,
      width: _double,
      height: _double,
      patternUnits: "userSpaceOnUse"
    }, content));
  }
  return /*#__PURE__*/_react["default"].createElement(_StyledChart.StyledChart, _extends({
    ref: containerRef,
    id: id,
    "aria-label": a11yTitle,
    viewBox: viewBox,
    preserveAspectRatio: "none",
    width: size === 'full' ? '100%' : size.width,
    height: size === 'full' ? '100%' : size.height,
    typeProp: type // prevent adding to DOM
  }, rest), defs.length && /*#__PURE__*/_react["default"].createElement("defs", null, defs), useGradient ? gradientRect : drawing);
});
Chart.displayName = 'Chart';
Chart.propTypes = _propTypes.ChartPropTypes;