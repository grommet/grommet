var _excluded = ["a11yTitle", "bounds", "color", "dash", "gap", "id", "onClick", "onHover", "opacity", "overflow", "pad", "pattern", "point", "round", "size", "thickness", "type", "values"],
    _excluded2 = ["color", "label", "onHover", "opacity", "thickness", "value"],
    _excluded3 = ["color", "label", "onHover", "opacity", "thickness", "value"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useContext, useEffect, useMemo, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { useLayoutEffect } from '../../utils/use-isomorphic-layout-effect';
import { defaultProps } from '../../default-props';
import { normalizeColor, parseMetricToNum, useForwardedRef } from '../../utils';
import { StyledChart } from './StyledChart';
import { normalizeBounds, normalizeValues } from './utils';
import { ChartPropTypes } from './propTypes';
var gradientMaskColor = '#ffffff'; // use constants so re-renders don't re-trigger effects

var defaultSize = {
  height: 'small',
  width: 'medium'
};
var defaultValues = [];
var Chart = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var a11yTitle = _ref.a11yTitle,
      propsBounds = _ref.bounds,
      color = _ref.color,
      dash = _ref.dash,
      gap = _ref.gap,
      id = _ref.id,
      onClick = _ref.onClick,
      onHover = _ref.onHover,
      propsOpacity = _ref.opacity,
      _ref$overflow = _ref.overflow,
      overflow = _ref$overflow === void 0 ? false : _ref$overflow,
      pad = _ref.pad,
      pattern = _ref.pattern,
      point = _ref.point,
      round = _ref.round,
      _ref$size = _ref.size,
      propsSize = _ref$size === void 0 ? defaultSize : _ref$size,
      _ref$thickness = _ref.thickness,
      thickness = _ref$thickness === void 0 ? 'medium' : _ref$thickness,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'bar' : _ref$type,
      _ref$values = _ref.values,
      propsValues = _ref$values === void 0 ? defaultValues : _ref$values,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);

  var containerRef = useForwardedRef(ref);
  var theme = useContext(ThemeContext) || defaultProps.theme; // normalize variables

  var values = useMemo(function () {
    return normalizeValues(propsValues);
  }, [propsValues]);
  var bounds = useMemo(function () {
    return normalizeBounds(propsBounds, values);
  }, [propsBounds, values]);
  var strokeWidth = useMemo(function () {
    return parseMetricToNum(theme.global.edgeSize[thickness] || thickness);
  }, [theme.global.edgeSize, thickness]);
  var inset = useMemo(function () {
    var result = [0, 0, 0, 0];

    if (pad) {
      if (pad.horizontal) {
        var padSize = parseMetricToNum(theme.global.edgeSize[pad.horizontal]);
        result[0] += padSize;
        result[2] += padSize;
      }

      if (pad.vertical) {
        var _padSize = parseMetricToNum(theme.global.edgeSize[pad.vertical]);

        result[1] += _padSize;
        result[3] += _padSize;
      }

      if (typeof pad === 'string') {
        var _padSize2 = parseMetricToNum(theme.global.edgeSize[pad]);

        result = [_padSize2, _padSize2, _padSize2, _padSize2];
      }
    }

    return result;
  }, [pad, theme.global.edgeSize]);
  var strokeDasharray = useMemo(function () {
    if (dash) {
      if (round) return strokeWidth + " " + strokeWidth * 1.5;
      return strokeWidth * 2 + " " + strokeWidth / 2;
    }

    return undefined;
  }, [dash, round, strokeWidth]); // potentially dynamic sizing

  var _useState = useState([0, 0]),
      containerSize = _useState[0],
      setContainerSize = _useState[1];

  var needContainerSize = useMemo(function () {
    return propsSize && (propsSize === 'full' || propsSize === 'fill' || propsSize.height === 'full' || propsSize.height === 'fill' || propsSize.width === 'full' || propsSize.width === 'fill');
  }, [propsSize]);
  var size = useMemo(function () {
    var gapWidth = gap ? parseMetricToNum(theme.global.edgeSize[gap] || gap) : strokeWidth; // autoWidth is how wide we'd pefer

    var autoWidth = strokeWidth * values.length + (values.length - 1) * gapWidth;
    var sizeWidth = typeof propsSize === 'string' ? propsSize : propsSize.width || defaultSize.width;
    var width;

    if (sizeWidth === 'full' || sizeWidth === 'fill') {
      width = containerSize[0];
    } else if (sizeWidth === 'auto') {
      width = autoWidth;
    } else {
      width = parseMetricToNum(theme.global.size[sizeWidth] || sizeWidth);
    }

    var sizeHeight = typeof propsSize === 'string' ? propsSize : propsSize.height || defaultSize.height;
    var height;

    if (sizeHeight === 'full' || sizeHeight === 'fill') {
      height = containerSize[1];
    } else {
      height = parseMetricToNum(theme.global.size[sizeHeight] || sizeHeight);
    }

    return [width, height];
  }, [containerSize, gap, propsSize, strokeWidth, theme.global.edgeSize, theme.global.size, values]);
  var scale = useMemo(function () {
    return [(size[0] - (inset[0] + inset[2])) / (bounds[0][1] - bounds[0][0]), (size[1] - (inset[1] + inset[3])) / (bounds[1][1] - bounds[1][0])];
  }, [bounds, inset, size]);
  var viewBounds = useMemo(function () {
    return overflow ? [0, 0, size[0], size[1]] : [-(strokeWidth / 2), -(strokeWidth / 2), size[0] + strokeWidth, size[1] + strokeWidth];
  }, [overflow, size, strokeWidth]); // set container size when we get ref or when size changes

  useLayoutEffect(function () {
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
  }, [containerRef, containerSize, needContainerSize]); // container size, if needed

  useEffect(function () {
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
  }, [containerRef, needContainerSize]); // Converts values to drawing coordinates.
  // Takes into account the bounds, any inset, and the scale.

  var valueToCoordinate = function valueToCoordinate(xValue, yValue) {
    return [(xValue - bounds[0][0]) * scale[0] + inset[0], size[1] - ((yValue - bounds[1][0]) * scale[1] + inset[1])];
  };

  var useGradient = color && Array.isArray(color);
  var patternId;

  function getOpacity(valueOpacity) {
    return valueOpacity && theme.global.opacity[valueOpacity] || (valueOpacity === true ? theme.global.opacity.medium : valueOpacity === false ? undefined : valueOpacity);
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

      var key = "p-" + index; // Math.min/max are to handle negative values

      var bottom = value.length === 2 ? Math.min(Math.max(0, bounds[1][0]), value[1]) : Math.min(value[1], value[2]);
      var top = value.length === 2 ? Math.max(Math.min(0, bounds[1][1]), value[1]) : Math.max(value[1], value[2]);
      var d = "M " + valueToCoordinate(value[0], bottom).join(',') + (" L " + valueToCoordinate(value[0], top).join(','));
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

      return /*#__PURE__*/React.createElement("g", {
        key: key,
        fill: "none",
        stroke: valueColor ? normalizeColor(valueColor, theme) : undefined,
        strokeWidth: valueThickness ? parseMetricToNum(theme.global.edgeSize[valueThickness] || valueThickness) : undefined,
        opacity: getOpacity(valueOpacity)
      }, /*#__PURE__*/React.createElement("title", null, label), /*#__PURE__*/React.createElement("path", _extends({
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
      d += (d ? ' L' : 'M') + " " + valueToCoordinate(value[0], value[1]).join(',');

      if (value[2] !== undefined) {
        d2 += (d2 ? ' L' : 'M') + " " + valueToCoordinate(value[0], value[2]).join(',');
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

    return /*#__PURE__*/React.createElement("g", {
      fill: "none"
    }, /*#__PURE__*/React.createElement("path", _extends({
      d: d
    }, hoverProps, clickProps, {
      strokeDasharray: strokeDasharray
    })), d2 && /*#__PURE__*/React.createElement("path", _extends({
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
      d += (!index ? 'M' : ' L') + " " + valueToCoordinate(value[0], value[value.length === 2 ? 1 : 2]).join(',');
    });
    (values || []).filter(function (_ref7) {
      var value = _ref7.value;
      return value[1] !== undefined;
    }).reverse().forEach(function (_ref8) {
      var value = _ref8.value;
      d += " L " + valueToCoordinate(value[0], // Math.max() is to account for value[1] being negative
      value.length === 2 ? Math.max(0, bounds[1][0]) : value[1]).join(',');
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
    return /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", _extends({
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

      var width = valueThickness ? parseMetricToNum(theme.global.edgeSize[valueThickness] || valueThickness) : strokeWidth;

      var renderPoint = function renderPoint(valueX, valueY) {
        var props = _extends({}, hoverProps, clickProps, valueRest);

        var _valueToCoordinate = valueToCoordinate(valueX, valueY),
            cx = _valueToCoordinate[0],
            cy = _valueToCoordinate[1];

        var off = width / 2;
        if (point === 'circle' || !point && round) return /*#__PURE__*/React.createElement("circle", _extends({
          cx: cx,
          cy: cy,
          r: off
        }, props));
        var d;
        if (point === 'diamond') d = "M " + cx + " " + (cy - off) + " L " + (cx + off) + " " + cy + " L " + cx + " " + (cy + off) + " L " + (cx - off) + " " + cy + " Z";else if (point === 'star') {
          var off1 = off / 3;
          var off2 = off1 * 2;
          d = "M " + cx + " " + (cy - off) + " L " + (cx - off2) + " " + (cy + off) + " L " + (cx + off) + " " + (cy - off1) + " L " + (cx - off) + " " + (cy - off1) + " L " + (cx + off2) + " " + (cy + off) + " Z";
        } else if (point === 'triangle') d = "M " + cx + " " + (cy - off) + " L " + (cx + off) + " " + (cy + off) + " L " + (cx - off) + " " + (cy + off) + " Z";else if (point === 'triangleDown') d = "M " + (cx - off) + " " + (cy - off) + " L " + (cx + off) + " " + (cy - off) + " L " + cx + " " + (cy + off) + " Z"; // square
        else d = "M " + (cx - off) + " " + (cy - off) + " L " + (cx + off) + " " + (cy - off) + " L " + (cx + off) + " " + (cy + off) + " L " + (cx - off) + " " + (cy + off) + " Z";
        return /*#__PURE__*/React.createElement("path", {
          d: d
        });
      };

      return /*#__PURE__*/React.createElement("g", {
        key: key,
        stroke: "none",
        fill: valueColor ? normalizeColor(valueColor, theme) : undefined,
        opacity: getOpacity(valueOpacity)
      }, /*#__PURE__*/React.createElement("title", null, label), renderPoint(value[0], value[1]), value[2] !== undefined && renderPoint(value[0], value[2]));
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

  var viewBox = viewBounds.join(' ');
  var colorName;

  if (!useGradient) {
    if (color && color.color) colorName = color.color;else if (color) colorName = color;else if (theme.chart && theme.chart.color) colorName = theme.chart.color;
  }

  var opacity;

  if (propsOpacity === true) {
    opacity = theme.global.opacity.medium;
  } else if (propsOpacity) {
    opacity = theme.global.opacity[propsOpacity] ? theme.global.opacity[propsOpacity] : propsOpacity;
  } else if (color && color.opacity) {
    opacity = theme.global.opacity[color.opacity] ? theme.global.opacity[color.opacity] : color.opacity;
  } else opacity = undefined;

  var stroke;

  if (type !== 'point') {
    if (useGradient) stroke = gradientMaskColor;else stroke = normalizeColor(colorName, theme);
  } else stroke = 'none';

  var fill;

  if (type === 'point' || type === 'area') {
    if (useGradient) fill = gradientMaskColor;else fill = normalizeColor(colorName, theme);
  } else fill = 'none';

  var drawing = /*#__PURE__*/React.createElement("g", {
    stroke: stroke,
    strokeWidth: type !== 'point' && (type !== 'area' || !pattern) ? strokeWidth : undefined,
    fill: fill,
    strokeLinecap: round ? 'round' : 'butt',
    strokeLinejoin: round ? 'round' : 'miter',
    opacity: opacity
  }, contents);
  var defs = [];
  var gradientRect;

  if (useGradient && size[1]) {
    var uniqueGradientId = color.map(function (element) {
      return element.color;
    }).join('-');
    var gradientId = uniqueGradientId + "-" + id + "-gradient";
    var maskId = uniqueGradientId + "-" + id + "-mask";
    defs.push( /*#__PURE__*/React.createElement("linearGradient", {
      key: "gradientId",
      id: gradientId,
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 1
    }, color.slice(0).sort(function (c1, c2) {
      return c2.value - c1.value;
    }).map(function (_ref10) {
      var value = _ref10.value,
          gradientColor = _ref10.color;
      return /*#__PURE__*/React.createElement("stop", {
        key: value,
        offset: // TODO:
        (size[1] - (value - bounds[1][0]) * scale[1]) / size[1],
        stopColor: normalizeColor(gradientColor, theme)
      });
    })));
    defs.push( /*#__PURE__*/React.createElement("mask", {
      key: "mask",
      id: maskId
    }, drawing));
    gradientRect = /*#__PURE__*/React.createElement("rect", {
      x: viewBounds[0],
      y: viewBounds[1],
      width: viewBounds[2],
      height: viewBounds[3],
      fill: "url(#" + gradientId + ")",
      mask: "url(#" + maskId + ")"
    });
  } else if (patternId) {
    var content;
    var diagonal = pattern.match(/Diagonal/);
    var unit = diagonal ? strokeWidth * Math.sqrt(2) : strokeWidth;
    var half = unit / 2;

    var _double = unit * 2;

    var pColor = normalizeColor(colorName, theme);

    if (pattern === 'squares') {
      content = /*#__PURE__*/React.createElement("rect", {
        x: half,
        y: half,
        width: unit,
        height: unit,
        fill: pColor
      });
    } else if (pattern === 'circles') {
      content = /*#__PURE__*/React.createElement("circle", {
        cx: unit,
        cy: unit,
        r: half,
        fill: pColor
      });
    } else if (pattern === 'stripesHorizontal') {
      content = /*#__PURE__*/React.createElement("path", {
        d: "M 0 " + unit + " L " + _double + " " + unit,
        stroke: pColor,
        strokeWidth: strokeWidth
      });
    } else if (pattern === 'stripesVertical') {
      content = /*#__PURE__*/React.createElement("path", {
        d: "M " + unit + " 0 L " + unit + " " + _double,
        stroke: pColor,
        strokeWidth: strokeWidth
      });
    } else if (pattern === 'stripesDiagonalDown') {
      content = /*#__PURE__*/React.createElement("path", {
        d: "M " + half + " " + -half + " L " + (_double + half) + " " + (_double - half) + "\n              M " + -half + " " + half + " L " + (_double - half) + " " + (_double + half),
        stroke: pColor,
        strokeWidth: strokeWidth
      });
    } else if (pattern === 'stripesDiagonalUp') {
      content = /*#__PURE__*/React.createElement("path", {
        d: "M " + -half + " " + (_double - half) + " L " + (_double - half) + " " + -half + "\n              M " + half + " " + (_double + half) + " L " + (_double + half) + " " + half,
        stroke: pColor,
        strokeWidth: strokeWidth
      });
    }

    defs.push( /*#__PURE__*/React.createElement("pattern", {
      key: patternId,
      id: patternId,
      width: _double,
      height: _double,
      patternUnits: "userSpaceOnUse"
    }, content));
  }

  return /*#__PURE__*/React.createElement(StyledChart, _extends({
    ref: containerRef,
    id: id,
    "aria-label": a11yTitle,
    viewBox: viewBox,
    preserveAspectRatio: "none",
    width: size === 'full' ? '100%' : size[0],
    height: size === 'full' ? '100%' : size[1],
    typeProp: type // prevent adding to DOM

  }, rest), defs.length && /*#__PURE__*/React.createElement("defs", null, defs), useGradient ? gradientRect : drawing);
});
Chart.displayName = 'Chart';
Chart.propTypes = ChartPropTypes;
export { Chart };