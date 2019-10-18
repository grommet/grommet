"use strict";

exports.__esModule = true;
exports.Chart = void 0;

var _react = _interopRequireWildcard(require("react"));

var _recompose = require("recompose");

var _styledComponents = require("styled-components");

var _utils = require("../../utils");

var _StyledChart = require("./StyledChart");

var _utils2 = require("./utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

      return _react["default"].createElement("g", {
        key: key,
        fill: "none"
      }, _react["default"].createElement("title", null, label), _react["default"].createElement("path", _extends({
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

  return _react["default"].createElement("g", {
    fill: "none"
  }, _react["default"].createElement("path", _extends({
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

  return _react["default"].createElement("g", {
    fill: (0, _utils.normalizeColor)(color.color || color, theme)
  }, _react["default"].createElement("path", _extends({
    d: d
  }, hoverProps, clickProps)));
};

var Chart = function Chart(_ref6) {
  var _ref6$color = _ref6.color,
      color = _ref6$color === void 0 ? 'accent-1' : _ref6$color,
      onClick = _ref6.onClick,
      onHover = _ref6.onHover,
      _ref6$overflow = _ref6.overflow,
      overflow = _ref6$overflow === void 0 ? false : _ref6$overflow,
      round = _ref6.round,
      _ref6$size = _ref6.size,
      size = _ref6$size === void 0 ? {
    width: 'medium',
    height: 'small'
  } : _ref6$size,
      theme = _ref6.theme,
      _ref6$thickness = _ref6.thickness,
      thickness = _ref6$thickness === void 0 ? 'medium' : _ref6$thickness,
      _ref6$type = _ref6.type,
      type = _ref6$type === void 0 ? 'bar' : _ref6$type,
      values = _ref6.values,
      bounds = _ref6.bounds,
      rest = _objectWithoutPropertiesLoose(_ref6, ["color", "onClick", "onHover", "overflow", "round", "size", "theme", "thickness", "type", "values", "bounds"]);

  var containerRef = (0, _react.useRef)();

  var _useState = (0, _react.useState)({
    width: 0,
    height: 0
  }),
      containerState = _useState[0],
      setContainerState = _useState[1];

  var _useState2 = (0, _react.useState)({
    values: null,
    bounds: null
  }),
      sizeState = _useState2[0],
      setSizeState = _useState2[1];

  var nextValues = (0, _utils2.normalizeValues)(values);
  var nextBounds = (0, _utils2.normalizeBounds)(bounds, nextValues);

  if (!sizeState.values || !(0, _utils2.areNormalizedValuesEquals)(values, sizeState.values) && !(0, _utils2.areNormalizedValuesEquals)(sizeState.values, nextValues) || !(0, _utils2.areNormalizedBoundsEquals)(bounds, sizeState.bounds) && !(0, _utils2.areNormalizedBoundsEquals)(sizeState.bounds, nextBounds)) {
    setSizeState({
      bounds: nextBounds,
      values: nextValues
    });
  }

  var onResize = function onResize() {
    var containerNode = containerRef.current;

    if (containerNode) {
      var parentNode = containerNode.parentNode;

      if (parentNode) {
        var rect = parentNode.getBoundingClientRect();
        setContainerState({
          width: rect.width,
          height: rect.height
        });
      }
    }
  };

  (0, _react.useEffect)(function () {
    window.addEventListener('resize', onResize);
    onResize();
    return function cleanup() {
      window.removeEventListener('resize', onResize);
    };
  }, []);
  if (!sizeState.bounds || !sizeState.values) return null;
  var sizeWidth = typeof size === 'string' ? size : size.width || 'medium';
  var sizeHeight = typeof size === 'string' ? size : size.height || 'medium';
  var width = sizeWidth === 'full' ? containerState.width : (0, _utils.parseMetricToNum)(theme.global.size[sizeWidth] || sizeWidth);
  var height = sizeHeight === 'full' ? containerState.height : (0, _utils.parseMetricToNum)(theme.global.size[sizeHeight] || sizeHeight);
  var strokeWidth = (0, _utils.parseMetricToNum)(theme.global.edgeSize[thickness]);
  var scale = [width / (sizeState.bounds[0][1] - sizeState.bounds[0][0]), height / (sizeState.bounds[1][1] - sizeState.bounds[1][0])];
  var viewBox = overflow ? "0 0 " + width + " " + height : "-" + strokeWidth / 2 + " -" + strokeWidth / 2 + " " + (width + strokeWidth) + " " + (height + strokeWidth);
  var colorName = typeof color === 'object' ? color.color : color;
  var opacity = color.opacity ? theme.global.opacity[color.opacity] : undefined;
  var contents;

  if (type === 'bar') {
    contents = renderBars(sizeState.values, sizeState.bounds, scale, height);
  } else if (type === 'line') {
    contents = renderLine(sizeState.values, sizeState.bounds, scale, height, {
      onClick: onClick,
      onHover: onHover
    });
  } else if (type === 'area') {
    contents = renderArea(sizeState.values, sizeState.bounds, scale, height, {
      color: color,
      onClick: onClick,
      onHover: onHover,
      theme: theme
    });
  }

  return _react["default"].createElement(_StyledChart.StyledChart, _extends({
    ref: containerRef,
    viewBox: viewBox,
    preserveAspectRatio: "none",
    width: size === 'full' ? '100%' : width,
    height: size === 'full' ? '100%' : height
  }, rest), _react["default"].createElement("g", {
    stroke: (0, _utils.normalizeColor)(colorName, theme),
    strokeWidth: strokeWidth,
    strokeLinecap: round ? 'round' : 'butt',
    strokeLinejoin: round ? 'round' : 'miter',
    opacity: opacity
  }, contents));
};

var ChartDoc;

if (process.env.NODE_ENV !== 'production') {
  ChartDoc = require('./doc').doc(Chart); // eslint-disable-line global-require
}

var ChartWrapper = (0, _recompose.compose)(_styledComponents.withTheme)(ChartDoc || Chart);
exports.Chart = ChartWrapper;