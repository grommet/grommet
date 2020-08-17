function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Box } from '../Box';
import { Chart, calcs, calcBounds } from '../Chart';
import { Grid } from '../Grid';
import { Stack } from '../Stack';
import { Detail } from './Detail';
import { Legend } from './Legend';
import { XAxis } from './XAxis';
import { YAxis } from './YAxis';
import { XGuide } from './XGuide';
import { YGuide } from './YGuide';
import { createDateFormat, halfPad, heightYGranularity, points } from './utils'; // DataChart takes a generic data array of objects plus as few properties
// as possible, and creates a Stack of Charts with x and y axes, a legend,
// and interactive detail.
// Much of the code here-in involves the "few properties" aspect where we
// normalize and automatically handle whatever the caller didn't specify.

var DataChart = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var a11yTitle = _ref.a11yTitle,
      _ref$axis = _ref.axis,
      axisProp = _ref$axis === void 0 ? true : _ref$axis,
      _ref$bounds = _ref.bounds,
      boundsProp = _ref$bounds === void 0 ? 'align' : _ref$bounds,
      chart = _ref.chart,
      _ref$data = _ref.data,
      data = _ref$data === void 0 ? [] : _ref$data,
      detail = _ref.detail,
      _ref$gap = _ref.gap,
      gap = _ref$gap === void 0 ? 'small' : _ref$gap,
      guideProp = _ref.guide,
      legend = _ref.legend,
      padProp = _ref.pad,
      seriesProp = _ref.series,
      size = _ref.size,
      rest = _objectWithoutPropertiesLoose(_ref, ["a11yTitle", "axis", "bounds", "chart", "data", "detail", "gap", "guide", "legend", "pad", "series", "size"]);

  // legend interaction, if any
  var _useState = useState(),
      activeProperty = _useState[0],
      setActiveProperty = _useState[1]; // refs used for ie11 not having Grid


  var xRef = useRef();
  var spacerRef = useRef(); // normalize seriesProp to an array of objects, one per property

  var series = useMemo(function () {
    if (Array.isArray(seriesProp)) return seriesProp.map(function (s) {
      return typeof s === 'string' ? {
        property: s
      } : s;
    });
    if (typeof seriesProp === 'string') return [{
      property: seriesProp
    }];
    return [seriesProp];
  }, [seriesProp]);

  var getPropertySeries = function getPropertySeries(prop) {
    return series.find(function (_ref2) {
      var property = _ref2.property;
      return prop === property;
    });
  }; // Normalize chart to an array of objects.
  // Each chart has one or more properties associated with it.
  // A stacked bar chart has an array of properties.
  // A point chart can have x, y, thickness, and color each driven
  // by a separate property.


  var charts = useMemo(function () {
    if (!chart) {
      if (series.length === 1) return series.map(function (s) {
        return {
          property: s.property
        };
      }); // if we have more than one property, we'll use the first for
      // the x-axis and we'll plot the rest

      return series.slice(1).map(function (s) {
        return {
          property: s.property
        };
      });
    }

    if (Array.isArray(chart)) return chart.map(function (c) {
      return typeof c === 'string' ? {
        property: c
      } : c;
    });
    return typeof chart === 'string' ? [{
      property: chart
    }] : [chart];
  }, [chart, series]); // map the series property values into their own arrays

  var seriesValues = useMemo(function () {
    var result = {};
    series.forEach(function (_ref3) {
      var property = _ref3.property;
      result[property] = data.map(function (d) {
        return d[property];
      });
    });
    return result;
  }, [data, series]); // Setup the values property for each chart.
  // The index into 'charts' can be used to index into 'chartValues'.

  var chartValues = useMemo(function () {
    return charts.map(function (_ref4) {
      var opacity = _ref4.opacity,
          property = _ref4.property,
          type = _ref4.type;

      if (property) {
        if (Array.isArray(property)) {
          // A range chart or a stacked bar chart have multiple properties.
          // In this case, this returns an array of values,
          // one per property.
          if (type === 'bars') {
            // Further down, where we render, each property is rendered
            // using a separate Chart component and the values are stacked
            // such that they line up appropriately.
            var totals = [];
            return property.map(function (cp) {
              return seriesValues[cp].map(function (v, i) {
                var base = totals[i] || 0;
                totals[i] = base + v;
                return [i, base, base + v];
              });
            });
          }

          return data.map(function (_, index) {
            return [index].concat(property.map(function (p) {
              return seriesValues[p] ? seriesValues[p][index] : data[index][p];
            }));
          });
        }

        if (typeof property === 'object') {
          // When 'property' is an array, the keys of this array indicate
          // which property drives which part of the rendered Chart.
          var color = property.color,
              thickness = property.thickness,
              x = property.x,
              y = property.y,
              y2 = property.y2;
          return seriesValues[x].map(function (value, index) {
            var aValue = {
              value: [value]
            };
            aValue.value.push(seriesValues[y][index]);
            if (y2) aValue.value.push(seriesValues[y2][index]);

            if (thickness) {
              var t = seriesValues[thickness.property || thickness][index];
              aValue.thickness = thickness.transform ? thickness.transform(t) : t;
            }

            if (color) {
              var c = seriesValues[color.property || color][index];
              aValue.color = color.transform ? color.transform(c) : c;
            }

            if (opacity) aValue.opacity = opacity;
            return aValue;
          });
        }

        return seriesValues[property];
      }

      return undefined;
    });
  }, [charts, data, seriesValues]); // map granularities to work well with the number of data points we have

  var granularities = useMemo(function () {
    var medium;
    [10, 9, 8, 7, 6, 5, 4, 3, 2].some(function (i) {
      if (data.length % i === 0) medium = i;
      return medium;
    });
    if (!medium) medium = 3;
    return {
      x: {
        coarse: 2,
        fine: data.length,
        medium: medium
      },
      y: _extends({}, heightYGranularity[size && size.height || 'small'] || {
        fine: 5,
        medium: 3
      }, {
        coarse: 2
      })
    };
  }, [data.length, size]); // normalize axis to objects, convert granularity to a number

  var axis = useMemo(function () {
    if (!axisProp) return undefined;
    var result = {};
    if (axisProp === true || axisProp.x === true) result.x = {};
    if (axisProp === true || axisProp.y === true) result.y = {};
    if (!result.x && axisProp.x) result.x = typeof axisProp.x === 'string' ? {
      property: axisProp.x
    } : _extends({}, axisProp.x);
    if (!result.y && axisProp.y) result.y = typeof axisProp.y === 'string' ? {
      property: axisProp.y
    } : _extends({}, axisProp.y);

    if (result.x) {
      if (!result.x.property) {
        // see if we have a point chart that has an x property
        if (data && data[0]) {
          if (data[0].date) result.x.property = 'date';else if (data[0].time) result.x.property = 'time';
        }
      }

      if (!result.x.granularity) result.x.granularity = 'coarse';
    }

    if (result.y) {
      if (!result.y.property && charts[0]) // see if we have a point chart that has an x property
        result.y.property = charts[0].property.y || charts[0].property;
      if (!result.y.granularity) result.y.granularity = 'coarse';
    } // calculate number of entries based on granularity


    if (result.x) {
      var _result$x$granularity = result.x.granularity,
          granularity = _result$x$granularity === void 0 ? 'coarse' : _result$x$granularity;
      result.x.count = granularities.x[granularity];
    }

    if (result.y) {
      var _result$y$granularity = result.y.granularity,
          _granularity = _result$y$granularity === void 0 ? 'coarse' : _result$y$granularity;

      result.y.count = granularities.y[_granularity];
    }

    return result;
  }, [axisProp, data, charts, granularities]); // calculate axis, bounds, and thickness for each chart

  var chartProps = useMemo(function () {
    var steps = [];
    var coarseness = [undefined, 5];

    if (axis && axis.x) {
      var _axis$x$granularity = axis.x.granularity,
          granularity = _axis$x$granularity === void 0 ? 'coarse' : _axis$x$granularity;
      steps[0] = granularities.x[granularity] - 1;
    } else steps[0] = data.length - 1;

    if (axis && axis.y) {
      var _axis$y$granularity = axis.y.granularity,
          _granularity2 = _axis$y$granularity === void 0 ? 'coarse' : _axis$y$granularity;

      steps[1] = granularities.y[_granularity2] - 1;
    } else steps[1] = 1;

    var chartBounds = chartValues.map(function (_, index) {
      if (charts[index].type === 'bars') {
        // merge values for bars case
        var mergedValues = chartValues[index][0].slice(0);
        chartValues[index].slice(1).forEach(function (values) {
          mergedValues = mergedValues.map(function (__, i) {
            return [i, Math.min(mergedValues[i][1], values[i][1]), Math.max(mergedValues[i][2], values[i][2])];
          });
        });
        return calcBounds(mergedValues, {
          coarseness: coarseness,
          steps: steps
        });
      } // if this is a data driven x chart, set coarseness for x


      return calcBounds(chartValues[index], {
        coarseness: charts[index].property.x ? [5, 5] : coarseness,
        steps: steps
      });
    });

    if (boundsProp === 'align') {
      var alignedBounds = [].concat(chartBounds[0]);
      chartBounds.forEach(function (bounds) {
        alignedBounds[0][0] = Math.min(alignedBounds[0][0], bounds[0][0]);
        alignedBounds[0][1] = Math.max(alignedBounds[0][1], bounds[0][1]);
        alignedBounds[1][0] = Math.min(alignedBounds[1][0], bounds[1][0]);
        alignedBounds[1][1] = Math.max(alignedBounds[1][1], bounds[1][1]);
      });
      chartBounds = chartBounds.map(function () {
        return alignedBounds;
      });
    }

    return chartValues.map(function (values, index) {
      var calcValues = charts[index].type === 'bars' ? values[0] : values;
      return calcs(calcValues, {
        bounds: chartBounds[index],
        steps: steps
      });
    });
  }, [axis, boundsProp, charts, chartValues, data, granularities]); // normalize how we style data properties for use by Legend and Detail

  var seriesStyles = useMemo(function () {
    var result = {}; // start from what we were explicitly given

    charts.forEach(function (_ref5, index) {
      var color = _ref5.color,
          point = _ref5.point,
          property = _ref5.property,
          thickness = _ref5.thickness,
          type = _ref5.type;
      var calcThickness = chartProps[index].thickness;

      if (typeof property === 'object' && !Array.isArray(property)) {
        // data driven point chart
        Object.keys(property).forEach(function (aspect) {
          var prop = property[aspect];
          if (!result[prop.property || prop]) result[prop.property || prop] = {
            aspect: aspect
          };
        });
      } else {
        var props = Array.isArray(property) ? property : [property];
        props.forEach(function (prop) {
          var p = prop.property || prop;
          if (!result[p]) result[p] = {};
          if (color && !result[p].color) result[p].color = color;
          if (point && !result[p].point) result[p].point = point;else if (type === 'point') result[p].point = false;
          if ((thickness || calcThickness) && !result[p].thickness) result[p].thickness = thickness || calcThickness;
        });
      }
    }); // set color for any non-aspect properties we don't have one for yet

    var colorIndex = 0;
    var pointIndex = 0;
    Object.keys(result).forEach(function (key) {
      var seriesStyle = result[key];

      if (!seriesStyle.aspect && !seriesStyle.color) {
        seriesStyle.color = "graph-" + colorIndex;
        colorIndex += 1;
      } // set opacity if it isn't set and this isn't the active property


      if (activeProperty !== undefined && activeProperty !== key) {
        seriesStyle.opacity = 'medium';
      }

      if (seriesStyle.point === false) {
        seriesStyle.point = points[pointIndex];
        pointIndex += 1;
      }
    });
    return result;
  }, [activeProperty, charts, chartProps]); // normalize guide

  var guide = useMemo(function () {
    if (!guideProp) return undefined;
    var result;

    if (guideProp === true) {
      result = {
        x: {},
        y: {}
      };
    } else {
      result = {};
      if (guideProp.x) result.x = _extends({}, guideProp.x);
      if (guideProp.y) result.y = _extends({}, guideProp.y);
    } // set counts


    if (result.x) {
      // if no granularity and axis, align count with axis
      if (!result.x.granularity && axis && axis.x) result.x.count = axis.x.count;
      if (!result.x.count) result.x.count = granularities.x[result.x.granularity || 'coarse'];
    }

    if (result.y) {
      // if no granularity and axis, align count with axis
      if (!result.y.granularity && axis && axis.y) result.y.count = axis.y.count;
      if (!result.y.count) result.y.count = granularities.y[result.y.granularity || 'coarse'];
    }

    return result;
  }, [axis, granularities, guideProp]); // set the pad to half the thickness, based on the chart types

  var pad = useMemo(function () {
    if (padProp !== undefined) return padProp;
    var result = {};
    charts.forEach(function (_ref6, index) {
      var type = _ref6.type;
      var thickness = chartProps[index].thickness;
      result.horizontal = halfPad[thickness];
      if (type && type !== 'bar') result.vertical = halfPad[thickness];
    });
    return result;
  }, [chartProps, charts, padProp]);
  var dateFormats = useMemo(function () {
    var result = {};
    var full = axis && axis.x && axis.x.granularity === 'coarse';
    series.forEach(function (_ref7) {
      var property = _ref7.property,
          render = _ref7.render;

      if (!render && data.length > 1 && typeof data[0][property] === 'string') {
        result[property] = createDateFormat(data[0][property], data[data.length - 1][property], full);
      }
    });
    return result;
  }, [axis, data, series]); // for ie11, align the spacer Box height to the x-axis height

  useLayoutEffect(function () {
    if (xRef.current && spacerRef.current) {
      var rect = xRef.current.getBoundingClientRect();
      spacerRef.current.style.height = rect.height + "px";
    }
  }, []);

  var renderValue = function renderValue(serie, dataIndex, valueArg) {
    var value;

    if (valueArg !== undefined) {
      if (serie && serie.render) return serie.render(valueArg);
      value = valueArg;
    } else {
      var datum = data[dataIndex];
      value = datum[serie.property];
      if (serie && serie.render) return serie.render(value, datum, serie.property);
    }

    if (serie) {
      var dateFormat = dateFormats[serie.property];
      if (dateFormat) return dateFormat(new Date(value));
      if (serie.prefix) value = "" + serie.prefix + value;
      if (serie.suffix) value = "" + value + serie.suffix;
    }

    return value;
  }; // TODO: revisit how x/y axis are hooked up to charts and series


  var xAxisElement = axis && axis.x ? /*#__PURE__*/React.createElement(XAxis, {
    ref: xRef,
    axis: axis,
    chartProps: chartProps,
    data: data,
    renderValue: renderValue,
    serie: axis.x.property && getPropertySeries(axis.x.property)
  }) : null;
  var yAxisElement = axis && axis.y ? /*#__PURE__*/React.createElement(YAxis, {
    axis: axis,
    chartProps: chartProps,
    pad: pad,
    renderValue: renderValue,
    serie: axis.y.property && getPropertySeries(axis.y.property)
  }) : null;
  var stackFill = useMemo(function () {
    if (size === 'fill' || size && size.width === 'fill' && size.height === 'fill') return true;
    if (size && size.width === 'fill') return 'horizontal';
    if (size && size.height === 'fill') return 'vertical';
    return undefined;
  }, [size]);
  var guidingChild = useMemo(function () {
    var result = 0;
    if (guide && guide.x) result += 1;
    if (guide && guide.y) result += 1;
    return result;
  }, [guide]);
  var stackElement = /*#__PURE__*/React.createElement(Stack, {
    gridArea: "charts",
    guidingChild: guidingChild,
    fill: stackFill
  }, guide && guide.x && /*#__PURE__*/React.createElement(XGuide, {
    guide: guide,
    pad: pad
  }), guide && guide.y && /*#__PURE__*/React.createElement(YGuide, {
    guide: guide,
    pad: pad
  }), charts.map(function (_ref8, i) {
    var prop = _ref8.property,
        type = _ref8.type,
        x = _ref8.x,
        y = _ref8.y,
        chartRest = _objectWithoutPropertiesLoose(_ref8, ["property", "type", "x", "y"]);

    if (type === 'bars') {
      // reverse to ensure area Charts are stacked in the right order
      return prop.map(function (cProp, j) {
        return /*#__PURE__*/React.createElement(Chart // eslint-disable-next-line react/no-array-index-key
        , _extends({
          key: j,
          values: chartValues[i][j],
          overflow: true
        }, seriesStyles[cProp], chartProps[i], chartRest, {
          type: "bar",
          size: size,
          pad: pad
        }));
      }).reverse();
    }

    return /*#__PURE__*/React.createElement(Chart // eslint-disable-next-line react/no-array-index-key
    , _extends({
      key: i,
      values: chartValues[i],
      overflow: true
    }, seriesStyles[prop], chartProps[i], chartRest, {
      type: type,
      size: size,
      pad: pad
    }));
  }), detail && /*#__PURE__*/React.createElement(Detail, {
    activeProperty: activeProperty,
    axis: axis,
    data: data,
    series: series,
    seriesStyles: seriesStyles,
    renderValue: renderValue
  }));
  var legendElement = legend ? /*#__PURE__*/React.createElement(Legend, {
    series: series,
    seriesStyles: seriesStyles,
    activeProperty: activeProperty,
    setActiveProperty: setActiveProperty
  }) : null; // IE11

  if (!Grid.available) {
    var _content = stackElement;

    if (xAxisElement) {
      _content = /*#__PURE__*/React.createElement(Box, null, _content, xAxisElement);
    }

    if (yAxisElement) {
      _content = /*#__PURE__*/React.createElement(Box, {
        direction: "row"
      }, /*#__PURE__*/React.createElement(Box, null, yAxisElement, /*#__PURE__*/React.createElement(Box, {
        ref: spacerRef,
        flex: false
      })), _content);
    }

    if (legendElement) {
      _content = /*#__PURE__*/React.createElement(Box, null, _content, legendElement);
    }

    return _content;
  }

  var content = /*#__PURE__*/React.createElement(Grid, _extends({
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
    }],
    gap: gap
  }, rest), xAxisElement, yAxisElement, stackElement);

  if (legendElement) {
    content = /*#__PURE__*/React.createElement(Box, {
      align: "start"
    }, content, legendElement);
  }

  return content;
});
DataChart.displayName = 'DataChart';
var DataChartDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  DataChartDoc = require('./doc').doc(DataChart);
}

var DataChartWrapper = DataChartDoc || DataChart;
export { DataChartWrapper as DataChart };