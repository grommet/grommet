function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from 'react';
import { normalizeColor, parseMetricToNum } from '../../utils';
import { useThemeValue } from '../../utils/useThemeValue';
var Swatch = function Swatch(_ref) {
  var aspect = _ref.aspect,
    color = _ref.color,
    dash = _ref.dash,
    opacityProp = _ref.opacity,
    point = _ref.point,
    round = _ref.round,
    thickness = _ref.thickness,
    type = _ref.type;
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme;
  var dim = parseInt(theme.global.spacing, 10) / 2;
  var half = dim / 2;
  var height = dim;
  var width = dim;
  var normalizedColor = color ? normalizeColor(color.color || color, theme) : undefined;
  var fill = normalizedColor;
  var stroke = 'none';
  var content;
  if (aspect === 'x') content = /*#__PURE__*/React.createElement("path", {
    d: "M 0 " + half + " L " + dim + " " + half,
    stroke: "#000"
  });else if (aspect === 'y') content = /*#__PURE__*/React.createElement("path", {
    d: "M " + half + " 0 L " + half + " " + dim,
    stroke: "#000"
  });else if (aspect === 'thickness') content = /*#__PURE__*/React.createElement("g", {
    stroke: "#000",
    fill: "none"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: half,
    cy: half,
    r: half / 4
  }), /*#__PURE__*/React.createElement("circle", {
    cx: half,
    cy: half,
    r: half - 1
  }));else if (aspect === 'color') content = /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
    x: 0,
    y: 0,
    width: half,
    height: dim,
    fill: "#000",
    opacity: 0.4
  }), /*#__PURE__*/React.createElement("rect", {
    x: half,
    y: 0,
    width: half,
    height: dim,
    fill: "#000",
    opacity: 0.8
  }));else if (point) {
    if (point === 'circle') content = /*#__PURE__*/React.createElement("circle", {
      cx: half,
      cy: half,
      r: half
    });else {
      var d;
      if (point === 'diamond') d = "M " + half + " 0 L " + dim + " " + half + " L " + half + " " + dim + " L 0 " + half + " Z";else if (point === 'star') {
        var off1 = half / 3;
        var off2 = off1 * 2;
        d = "M " + half + " 0 L " + (half - off2) + " " + dim + " L " + dim + " " + (half - off1) + " L 0 " + (half - off1) + " L " + (half + off2) + " " + dim + " Z";
      } else if (point === 'triangle') d = "M " + half + " 0 L " + dim + " " + dim + " L 0 " + dim + " Z";else if (point === 'triangleDown') d = "M 0 0 L " + dim + " 0 L " + half + " " + dim + " Z";else if (point === 'square') d = "M 0 0 L " + dim + " 0 L " + dim + " " + dim + " L 0 " + dim + " Z";
      if (d) content = /*#__PURE__*/React.createElement("path", {
        d: d
      });
    }
  } else if (type === 'area') {
    if (round) content = /*#__PURE__*/React.createElement("circle", {
      cx: half,
      cy: half,
      r: half
    });else content = /*#__PURE__*/React.createElement("rect", {
      x: 0,
      y: 0,
      width: width,
      height: height
    });
  } else {
    // draw a line oriented based on the type and then match style
    var strokeWidth = parseMetricToNum(theme.global.edgeSize[thickness]) || dim;
    var _d;
    if (type === 'line' || type === 'area') {
      width = Math.max(width, strokeWidth * 4);
      height = strokeWidth;
      _d = "M 0 " + height / 2 + " L " + width + " " + height / 2;
    } else {
      width = strokeWidth;
      _d = "M " + width / 2 + " 0 L " + width / 2 + " " + dim;
    }
    fill = 'none';
    stroke = normalizedColor;
    var strokeProps = {};
    if (round) strokeProps.strokeLinecap = 'round';
    if (dash) strokeProps.strokeDasharray = round ? strokeWidth + " " + strokeWidth * 1.5 : strokeWidth * 2 + " " + strokeWidth / 2;
    content = /*#__PURE__*/React.createElement("path", _extends({
      d: _d,
      strokeWidth: strokeWidth
    }, strokeProps));
  }
  var opacity = theme.global.opacity[(color == null ? void 0 : color.opacity) || opacityProp] || undefined;
  return /*#__PURE__*/React.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 " + width + " " + height,
    fill: fill,
    opacity: opacity,
    stroke: stroke
  }, content);
};
export { Swatch };