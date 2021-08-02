import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { normalizeColor, parseMetricToNum } from '../../utils';

var Swatch = function Swatch(_ref) {
  var aspect = _ref.aspect,
      color = _ref.color,
      point = _ref.point,
      thickness = _ref.thickness;
  var theme = useContext(ThemeContext);
  var dim = parseInt(theme.global.spacing, 10) / 2;
  var half = dim / 2;
  var width = dim;
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
  }));else if (point === 'circle') content = /*#__PURE__*/React.createElement("circle", {
    cx: half,
    cy: half,
    r: half
  });else {
    var d;
    if (point === 'diamond') d = "M " + half + " 0 L " + dim + " " + half + " L " + half + " " + dim + " L 0 " + half + " Z";else if (point === 'star') {
      var off1 = half / 3;
      var off2 = off1 * 2;
      d = "M " + half + " 0 L " + (half - off2) + " " + dim + " L " + dim + " " + (half - off1) + " L 0 " + (half - off1) + " L " + (half + off2) + " " + dim + " Z";
    } else if (point === 'triangle') d = "M " + half + " 0 L " + dim + " " + dim + " L 0 " + dim + " Z";else if (point === 'triangleDown') d = "M 0 0 L " + dim + " 0 L " + half + " " + dim + " Z";else if (point === 'square') d = "M 0 0 L " + dim + " 0 L " + dim + " " + dim + " L 0 " + dim + " Z"; // TODO: dash
    else if (thickness) {
      width = parseMetricToNum(theme.global.edgeSize[thickness]) || dim;
      d = "M 0 0 L " + width + " 0 L " + width + " " + dim + " L 0 " + dim + " Z";
    } // box
    else d = "M 0 0 L " + dim + " 0 L " + dim + " " + dim + " L 0 " + dim + " Z";
    content = /*#__PURE__*/React.createElement("path", {
      d: d
    });
  }
  var opacity = color && color.opacity ? theme.global.opacity[color.opacity] : undefined;
  return /*#__PURE__*/React.createElement("svg", {
    width: width,
    height: dim,
    viewBox: "0 0 " + width + " " + dim,
    fill: color ? normalizeColor(color.color || color, theme) : undefined,
    opacity: opacity,
    stroke: "none"
  }, content);
};

export { Swatch };