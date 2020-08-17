import React, { forwardRef, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Box } from '../Box';
import { round } from '../Chart';
import { doublePad } from './utils';
var YAxis = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var chartProps = _ref.chartProps,
      pad = _ref.pad,
      renderValue = _ref.renderValue,
      _ref$serie = _ref.serie,
      serie = _ref$serie === void 0 ? {} : _ref$serie;
  var theme = useContext(ThemeContext);
  var render = serie.render,
      suffix = serie.suffix; // pull the x-axis values from the first chart, all should have the same

  var _axis = (Array.isArray(chartProps[0]) ? chartProps[0][0] : chartProps[0]).axis,
      axisValues = _axis[1];
  var divideBy;
  var unit;

  if (!render && !suffix) {
    // figure out how many digits to show
    var maxValue = Math.max.apply(Math, axisValues.map(function (v) {
      return Math.abs(v);
    }));

    if (maxValue > 10000000) {
      divideBy = 1000000;
      unit = 'M';
    } else if (maxValue > 10000) {
      divideBy = 1000;
      unit = 'K';
    }
  } // Set basis to match double the vertical pad, so we can align the
  // text with the guides


  var edgeSize = doublePad[pad.vertical || pad];
  var basis = theme.global.edgeSize[edgeSize] || edgeSize;
  return /*#__PURE__*/React.createElement(Box, {
    ref: ref,
    gridArea: "yAxis",
    justify: "between",
    flex: true
  }, axisValues.map(function (axisValue, i) {
    var content = renderValue(serie, undefined, axisValue);

    if (content === axisValue) {
      if (divideBy) content = round(content / divideBy, 0);
      if (unit) content = "" + content + unit;
    }

    return /*#__PURE__*/React.createElement(Box // eslint-disable-next-line react/no-array-index-key
    , {
      key: i,
      align: "end",
      basis: basis,
      flex: "shrink",
      justify: basis ? 'center' : undefined
    }, content);
  }));
});
export { YAxis };