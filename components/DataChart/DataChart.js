"use strict";

exports.__esModule = true;
exports.DataChart = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = require("styled-components");

var _Box = require("../Box");

var _Chart = require("../Chart");

var _Grid = require("../Grid");

var _Stack = require("../Stack");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var halfPad = {
  xlarge: 'large',
  large: 'medium',
  medium: 'small',
  small: 'xsmall',
  xsmall: 'xxsmall'
};
var doublePad = {
  large: 'xlarge',
  medium: 'large',
  small: 'medium',
  xsmall: 'small',
  xxsmall: 'xsmall'
};

var checkDateFormat = function checkDateFormat(firstValue, lastValue, full) {
  var dateFormat;
  var startDate = new Date(firstValue);
  var endDate = new Date(lastValue);

  if ( // check for valid dates, this is the fastest way
  !Number.isNaN(startDate.getTime()) && !Number.isNaN(endDate.getTime())) {
    var delta = Math.abs(endDate - startDate);
    var options;
    if (delta < 60000) // less than 1 minute
      options = full ? {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        day: undefined
      } : {
        second: '2-digit',
        day: undefined
      };else if (delta < 3600000) // less than 1 hour
      options = full ? {
        hour: 'numeric',
        minute: '2-digit',
        day: undefined
      } : {
        minute: '2-digit',
        day: undefined
      };else if (delta < 86400000) // less than 1 day
      options = {
        hour: 'numeric'
      };else if (delta < 2592000000) // less than 30 days
      options = {
        month: full ? 'short' : 'numeric',
        day: 'numeric'
      };else if (delta < 31557600000) // less than 1 year
      options = {
        month: full ? 'long' : 'short'
      }; // 1 year or more
    else options = {
        year: 'numeric'
      };
    if (options) dateFormat = new Intl.DateTimeFormat(undefined, options).format;
  }

  return dateFormat;
};

var DataChart = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var a11yTitle = _ref.a11yTitle,
      chart = _ref.chart,
      data = _ref.data,
      padProp = _ref.pad,
      size = _ref.size,
      thicknessProp = _ref.thickness,
      xAxis = _ref.xAxis,
      yAxis = _ref.yAxis,
      rest = _objectWithoutPropertiesLoose(_ref, ["a11yTitle", "chart", "data", "pad", "size", "thickness", "xAxis", "yAxis"]);

  console.warn("The DataChart component is still experimental.\n      It is not guaranteed to be backwards compatible until it is explicitly\n      released. Keep an eye on the release notes and #announcements channel\n      in Slack.");
  var theme = (0, _react.useContext)(_styledComponents.ThemeContext); // refs used for ie11 not having Grid

  var xRef = (0, _react.useRef)();
  var spacerRef = (0, _react.useRef)(); // normalize chart to an array

  var charts = (0, _react.useMemo)(function () {
    return Array.isArray(chart) ? chart : [chart];
  }, [chart]); // map the key values into their own arrays

  var keyValues = (0, _react.useMemo)(function () {
    var result = {};
    charts.forEach(function (_ref2) {
      var key = _ref2.key,
          keys = _ref2.keys;

      if (key && !result[key]) {
        result[key] = data.map(function (d) {
          return d[key];
        });
      }

      if (keys) {
        keys.forEach(function (_ref3) {
          var innerKey = _ref3.key;

          if (innerKey && !result[innerKey]) {
            result[innerKey] = data.map(function (d) {
              return d[innerKey];
            });
          }
        });
      }
    });
    return result;
  }, [charts, data]);
  var numValues = (0, _react.useMemo)(function () {
    return keyValues[Object.keys(keyValues)[0]].length;
  }, [keyValues]); // setup the values for each chart

  var chartValues = (0, _react.useMemo)(function () {
    return charts.map(function (_ref4) {
      var key = _ref4.key,
          keys = _ref4.keys;
      if (key) return keyValues[key];

      if (keys) {
        var totals = [];
        return keys.map(function (_ref5) {
          var innerKey = _ref5.key;
          return keyValues[innerKey].map(function (v, i) {
            var base = totals[i] || 0;
            totals[i] = base + v;
            return [i, base, base + v];
          });
        });
      }

      return [];
    });
  }, [charts, keyValues]); // calculate axis, bounds and thickness

  var _useMemo = (0, _react.useMemo)(function () {
    var steps = [];
    if (xAxis && xAxis.labels >= 0) steps[0] = xAxis.labels - 1;else steps[0] = numValues - 1; // all

    if (yAxis && yAxis.labels >= 0) steps[1] = yAxis.labels - 1;else steps[1] = 1; // ends

    var tmpAxis = [[], []];
    var tmpBounds;
    var tmpThickness = thicknessProp;
    charts.forEach(function (_ref6, index) {
      var keys = _ref6.keys;
      (keys ? chartValues[index] : [chartValues[index]]).filter(function (vals) {
        return vals && vals.length > 0;
      }).forEach(function (vals) {
        var _calcs = (0, _Chart.calcs)(vals, {
          steps: steps,
          thickness: tmpThickness
        }),
            a = _calcs.axis,
            b = _calcs.bounds,
            t = _calcs.thickness;

        tmpAxis = a;
        tmpBounds = b;
        tmpThickness = t;
      });
    });
    return {
      axis: tmpAxis,
      bounds: tmpBounds,
      thickness: tmpThickness
    };
  }, [charts, chartValues, numValues, thicknessProp, xAxis, yAxis]),
      axis = _useMemo.axis,
      bounds = _useMemo.bounds,
      thickness = _useMemo.thickness; // set the pad to have the thickness, if not defined


  var pad = (0, _react.useMemo)(function () {
    if (padProp !== undefined) return padProp;
    var padSize = halfPad[thickness];
    var allSides = charts.filter(function (_ref7) {
      var type = _ref7.type;
      return type && type !== 'bar';
    }).length > 0;
    if (allSides) return padSize;
    if (yAxis) return {
      horizontal: padSize,
      vertical: halfPad.medium
    };
    return {
      horizontal: padSize
    };
  }, [charts, padProp, thickness, yAxis]);
  var xGuide = (0, _react.useMemo)(function () {
    return axis[0].map(function (_, i) {
      if (xAxis && xAxis.guide) {
        if (i === 0) return 'left';
        if (i === axis[0].length - 1) return 'right';
      }

      return undefined;
    });
  }, [axis, xAxis]);
  var yGuide = (0, _react.useMemo)(function () {
    return axis[1].map(function (_, i) {
      if (yAxis && yAxis.guide) {
        if (i === 0) return 'top';
        if (i === axis[1].length - 1) return 'bottom';
      }

      return undefined;
    });
  }, [axis, yAxis]); // for ie11, align the spacer Box height to the x-axis height

  (0, _react.useLayoutEffect)(function () {
    if (xRef.current && spacerRef.current) {
      var rect = xRef.current.getBoundingClientRect();
      spacerRef.current.style.height = rect.height + "px";
    }
  }, []);
  /* eslint-disable react/no-array-index-key */

  var xAxisElement;

  if (xAxis) {
    // Set basis to match thickness. This works well for bar charts,
    // to align each bar's label.
    var basis;

    if (thickness && axis[0].length === numValues) {
      basis = theme.global.edgeSize[thickness] || thickness;
    } // If there is no custom renderer, there is a key, and the key value
    // looks like a Date, render it as a date, scaled based on the range
    // of values


    var dateFormat;

    if (!xAxis.render && xAxis.key && axis[0].length > 1) {
      dateFormat = checkDateFormat(data[Math.floor(axis[0][0])][xAxis.key], data[Math.floor(axis[0][axis[0].length - 1])][xAxis.key], axis[0].length <= 2);
    }

    xAxisElement = /*#__PURE__*/_react["default"].createElement(_Box.Box, {
      ref: xRef,
      gridArea: "xAxis",
      direction: "row",
      justify: "between"
    }, axis[0].map(function (dataIndex, i) {
      var content = xAxis.key ? data[Math.floor(dataIndex)][xAxis.key] : dataIndex;
      if (xAxis.render) content = xAxis.render(content, data, Math.floor(dataIndex), i);else if (dateFormat) content = dateFormat(new Date(content));
      return /*#__PURE__*/_react["default"].createElement(_Box.Box, {
        key: i,
        basis: basis,
        flex: "shrink",
        align: basis ? 'center' : undefined
      }, content);
    }));
  }

  var yAxisElement;

  if (yAxis) {
    var divideBy;
    var unit;

    if (!yAxis.render && !yAxis.suffix) {
      // figure out how many digits to show
      var maxValue = Math.max.apply(Math, axis[1].map(function (v) {
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


    var _basis;

    if (axis[0].length === numValues) {
      var edgeSize = doublePad[pad.vertical || pad];
      _basis = theme.global.edgeSize[edgeSize] || edgeSize;
    }

    yAxisElement = /*#__PURE__*/_react["default"].createElement(_Box.Box, {
      gridArea: "yAxis",
      justify: "between",
      flex: true
    }, axis[1].map(function (axisValue, i) {
      var content;
      if (yAxis.render) content = yAxis.render(axisValue, i);else {
        content = axisValue;

        if (divideBy) {
          content = (0, _Chart.round)(content / divideBy, 0);
        }

        if (yAxis.prefix) content = "" + yAxis.prefix + content;
        if (yAxis.suffix || unit) content = "" + content + (yAxis.suffix || unit);
      }
      return /*#__PURE__*/_react["default"].createElement(_Box.Box, {
        key: i,
        align: "end",
        basis: _basis,
        flex: "shrink",
        justify: _basis ? 'center' : undefined
      }, content);
    }));
  }

  var stackFill = (0, _react.useMemo)(function () {
    if (size === 'fill' || size && size.width === 'fill' && size.height === 'fill') return true;
    if (size && size.width === 'fill') return 'horizontal';
    if (size && size.height === 'fill') return 'vertical';
    return undefined;
  }, [size]);

  var stackElement = /*#__PURE__*/_react["default"].createElement(_Stack.Stack, {
    gridArea: "charts",
    guidingChild: "last",
    fill: stackFill
  }, xAxis && xAxis.guide && /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    fill: true,
    direction: "row",
    justify: "between",
    pad: pad,
    responsive: false
  }, xGuide.map(function (_, i) {
    return /*#__PURE__*/_react["default"].createElement(_Box.Box, {
      key: i,
      border: "left"
    });
  })), yAxis && yAxis.guide && /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    fill: true,
    justify: "between",
    pad: pad,
    responsive: false
  }, yGuide.map(function (_, i) {
    return /*#__PURE__*/_react["default"].createElement(_Box.Box, {
      key: i,
      border: "top"
    });
  })), charts.map(function (_ref8, i) {
    var key = _ref8.key,
        keys = _ref8.keys,
        chartRest = _objectWithoutPropertiesLoose(_ref8, ["key", "keys"]);

    if (keys) {
      // reverse to ensure area Charts are stacked in the right order
      return keys.map(function (_, j) {
        return /*#__PURE__*/_react["default"].createElement(_Chart.Chart, _extends({
          key: j,
          values: chartValues[i][j],
          color: keys[j].color,
          bounds: bounds,
          overflow: true,
          pad: pad,
          size: size,
          thickness: thickness
        }, chartRest));
      }).reverse();
    }

    return /*#__PURE__*/_react["default"].createElement(_Chart.Chart, _extends({
      key: i,
      values: chartValues[i],
      bounds: bounds,
      overflow: true,
      pad: pad,
      size: size,
      thickness: thickness
    }, chartRest));
  })); // IE11


  if (!_Grid.Grid.available) {
    var content = stackElement;

    if (xAxisElement) {
      content = /*#__PURE__*/_react["default"].createElement(_Box.Box, null, content, xAxisElement);
    }

    if (yAxisElement) {
      content = /*#__PURE__*/_react["default"].createElement(_Box.Box, {
        direction: "row"
      }, /*#__PURE__*/_react["default"].createElement(_Box.Box, null, yAxisElement, /*#__PURE__*/_react["default"].createElement(_Box.Box, {
        ref: spacerRef,
        flex: false
      })), content);
    }

    return content;
  }

  return /*#__PURE__*/_react["default"].createElement(_Grid.Grid, _extends({
    ref: ref,
    "aria-label": a11yTitle,
    fill: stackFill,
    columns: ['auto', stackFill === true || stackFill === 'horizontal' ? 'flex' : 'auto'],
    rows: [stackFill === true || stackFill === 'vertical' ? 'flex' : 'auto', 'auto'],
    areas: [{
      name: 'yAxis',
      start: [0, 0],
      end: [0, 0]
    }, {
      name: 'xAxis',
      start: [1, 1],
      end: [1, 1]
    }, {
      name: 'charts',
      start: [1, 0],
      end: [1, 0]
    }]
  }, rest), xAxisElement, yAxisElement, stackElement);
});
DataChart.displayName = 'DataChart';
var DataChartDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  DataChartDoc = require('./doc').doc(DataChart);
}

var DataChartWrapper = DataChartDoc || DataChart;
exports.DataChart = DataChartWrapper;