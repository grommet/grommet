var _excluded = ["a11yTitle", "axis", "bounds", "chart", "data", "detail", "direction", "gap", "guide", "legend", "offset", "placeholder", "pad", "series", "size"],
  _excluded2 = ["property"],
  _excluded3 = ["property", "type", "x", "y"],
  _excluded4 = ["property"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { forwardRef, useContext, useMemo, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { Box } from '../Box';
import { Chart, calcs, calcBounds } from '../Chart';
import { Grid } from '../Grid';
import { Stack } from '../Stack';
import { Text } from '../Text';
import { parseMetricToNum } from '../../utils';
import { Detail } from './Detail';
import { Legend } from './Legend';
import { XAxis } from './XAxis';
import { YAxis } from './YAxis';
import { XGuide } from './XGuide';
import { YGuide } from './YGuide';
import { createDateFormat, halfPad, heightYGranularity, largestSize, maximum, minimum, points } from './utils';
import { DataChartPropTypes } from './propTypes';
var stackedChartType = {
  areas: 'area',
  bars: 'bar',
  lines: 'line'
};

// DataChart takes a generic data array of objects plus as few properties
// as possible, and creates a Stack of Charts with x and y axes, a legend,
// and interactive detail.
// Much of the code here-in involves the "few properties" aspect where we
// normalize and automatically handle whatever the caller didn't specify.

var DataChart = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var _boundsProp$x, _boundsProp$y;
  var a11yTitle = _ref.a11yTitle,
    _ref$axis = _ref.axis,
    axisProp = _ref$axis === void 0 ? true : _ref$axis,
    _ref$bounds = _ref.bounds,
    boundsProp = _ref$bounds === void 0 ? 'align' : _ref$bounds,
    chartProp = _ref.chart,
    _ref$data = _ref.data,
    data = _ref$data === void 0 ? [] : _ref$data,
    detail = _ref.detail,
    _ref$direction = _ref.direction,
    direction = _ref$direction === void 0 ? 'vertical' : _ref$direction,
    _ref$gap = _ref.gap,
    gap = _ref$gap === void 0 ? 'small' : _ref$gap,
    guideProp = _ref.guide,
    legend = _ref.legend,
    offset = _ref.offset,
    placeholder = _ref.placeholder,
    padProp = _ref.pad,
    seriesProp = _ref.series,
    size = _ref.size,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var theme = useContext(ThemeContext) || defaultProps.theme;

  // legend interaction, if any
  var _useState = useState(),
    activeProperty = _useState[0],
    setActiveProperty = _useState[1];
  var horizontal = useMemo(function () {
    return direction === 'horizontal';
  }, [direction]);

  // normalize seriesProp to an array of objects, one per property
  var series = useMemo(function () {
    if (Array.isArray(seriesProp)) return seriesProp.filter(function (s) {
      return s.property || typeof s === 'string';
    }).map(function (s) {
      return typeof s === 'string' ? {
        property: s
      } : s;
    });
    if (typeof seriesProp === 'string') return [{
      property: seriesProp
    }];
    if (seriesProp) return [seriesProp];
    return [];
  }, [seriesProp]);
  var getPropertySeries = function getPropertySeries(prop) {
    return series.find(function (_ref2) {
      var property = _ref2.property;
      return prop === property;
    });
  };

  // Normalize chartProp to an array of objects.
  // Each chart has one or more properties associated with it.
  // A stacked bar or area chart has an array of properties.
  // A point chart can have x, y, thickness, and color each driven
  // by a separate property.
  var charts = useMemo(function () {
    if (!chartProp) {
      if (series.length === 1) return series.filter(function (s) {
        return s.property;
      }).map(function (s) {
        return {
          property: s.property
        };
      });
      // if we have more than one property, we'll use the first for
      // the x-axis and we'll plot the rest
      return series.slice(1).map(function (s) {
        return {
          property: s.property
        };
      });
    }
    if (Array.isArray(chartProp)) return chartProp.map(function (c) {
      return typeof c === 'string' ? {
        property: c
      } : c;
    }).filter(function (_ref3) {
      var property = _ref3.property;
      return property;
    });
    if (typeof chartProp === 'string') return [{
      property: chartProp
    }];
    if (chartProp) return [chartProp];
    return [];
  }, [chartProp, series]);

  // map the series property values into their own arrays
  var seriesValues = useMemo(function () {
    var result = {};
    series.forEach(function (_ref4) {
      var property = _ref4.property;
      result[property] = data.map(function (d) {
        return d[property];
      });
    });
    return result;
  }, [data, series]);

  // Setup the values property for each chart.
  // The index into 'charts' can be used to index into 'chartValues'.
  var chartValues = useMemo(function () {
    return charts.map(function (_ref5) {
      var opacity = _ref5.opacity,
        property = _ref5.property,
        type = _ref5.type;
      if (property) {
        if (Array.isArray(property)) {
          // A range chart or a stacked bar or area chart has multiple
          // properties.
          // In this case, this returns an array of values,
          // one per property.
          if (stackedChartType[type]) {
            // Further down, where we render, each property is rendered
            // using a separate Chart component and the values are stacked
            // such that they line up appropriately.
            var totals = [];
            return property.map(function (cp) {
              // handle object or string
              var aProperty = cp.property || cp;
              var values = seriesValues[aProperty];
              if (!values) return undefined; // property name isn't valid
              return values.map(function (v, i) {
                var base = totals[i] || 0;
                totals[i] = base + v;
                if (type === 'lines') return [i, base + v];
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
  }, [charts, data, seriesValues]);

  // map granularities to work well with the number of data points we have
  var granularities = useMemo(function () {
    var medium;
    // determine a good medium granularity that will align well with the
    // length of the data
    var steps = data.length - 1;
    // special case property driven point charts
    if (charts[0] && typeof charts[0].property === 'object') medium = 3;else if (steps < 4) medium = data.length;else if (steps === 4) medium = 3;else if (steps % 4 === 0) medium = 5;else if (steps % 3 === 0) medium = 4;else if (steps % 2 === 0) medium = 3;else medium = 2;
    var granularity0 = {
      coarse: Math.min(data.length, 2),
      fine: data.length,
      medium: medium
    };
    var granularity1 = _extends({}, heightYGranularity[size && size.height || 'small'] || {
      fine: 5,
      medium: 3
    }, {
      coarse: 2
    });
    return horizontal ? {
      x: granularity1,
      y: granularity0
    } : {
      x: granularity0,
      y: granularity1
    };
  }, [charts, data.length, horizontal, size]);

  // normalize axis to objects, convert granularity to a number
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
        if (horizontal) {
          if (charts[0]) result.x.property = charts[0].property.x || charts[0].property;
        } else if (data && data[0]) {
          if (data[0].date) result.x.property = 'date';else if (data[0].time) result.x.property = 'time';
        }
      }
      if (!result.x.granularity) result.x.granularity = 'coarse';
    }
    if (result.y) {
      if (!result.y.property) {
        // see if we have a point chart that has an y property
        if (horizontal) {
          if (data && data[0]) {
            if (data[0].date) result.y.property = 'date';else if (data[0].time) result.y.property = 'time';
          }
        } else if (charts[0]) result.y.property = charts[0].property.y || charts[0].property;
      }
      if (!result.y.granularity) result.y.granularity = 'coarse';
    }

    // calculate number of entries based on granularity
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
  }, [axisProp, data, charts, granularities, horizontal]);

  // calculate axis, bounds, and thickness for each chart
  var chartProps = useMemo(function () {
    var steps = {};
    var coarseness = horizontal ? [5, undefined] : [undefined, 5];
    if (axis && axis.x) {
      var _axis$x$granularity = axis.x.granularity,
        granularity = _axis$x$granularity === void 0 ? 'coarse' : _axis$x$granularity;
      steps.x = granularities.x[granularity] - 1;
    } else steps.x = horizontal ? 1 : data.length - 1;
    if (axis && axis.y) {
      var _axis$y$granularity = axis.y.granularity,
        _granularity2 = _axis$y$granularity === void 0 ? 'coarse' : _axis$y$granularity;
      steps.y = granularities.y[_granularity2] - 1;
    } else steps.y = horizontal ? data.length - 1 : 1;
    var chartBounds = chartValues.map(function (_, index) {
      var type = charts[index].type;
      if (stackedChartType[type]) {
        var _chartValues$index;
        // merge values for bars, areas, and lines cases
        var mergedValues = ((_chartValues$index = chartValues[index]) == null || (_chartValues$index = _chartValues$index[0]) == null ? void 0 : _chartValues$index.slice(0)) || [];
        chartValues[index].slice(1) // skip first index as that is the x value
        .filter(function (values) {
          return values;
        }) // property name isn't valid
        .forEach(function (values) {
          mergedValues = mergedValues.map(function (__, i) {
            return type === 'lines' ? [i, Math.min(mergedValues[i][1], values[i][1]), Math.max(mergedValues[i][1], values[i][1])] : [i, Math.min(mergedValues[i][1], values[i][1]), Math.max(mergedValues[i][2], values[i][2])];
          });
        });
        return calcBounds(mergedValues, {
          coarseness: coarseness,
          direction: direction,
          steps: steps
        });
      }
      // if this is a data driven x chart, set coarseness for x
      return calcBounds(chartValues[index], {
        coarseness: charts[index].property.x ? {
          x: 5,
          y: 5
        } : coarseness,
        direction: direction,
        steps: steps
      });
    });
    if (boundsProp === 'align' && chartBounds.length) {
      var alignedBounds = {
        x: {},
        y: {}
      };
      chartBounds.forEach(function (bounds) {
        alignedBounds.x.min = minimum(alignedBounds.x.min, bounds.x.min);
        alignedBounds.x.max = maximum(alignedBounds.x.max, bounds.x.max);
        alignedBounds.y.min = minimum(alignedBounds.y.min, bounds.y.min);
        alignedBounds.y.max = maximum(alignedBounds.y.max, bounds.y.max);
      });
      chartBounds = chartBounds.map(function () {
        return alignedBounds;
      });
    }
    return chartValues.map(function (values, index) {
      var _charts$index = charts[index],
        thickness = _charts$index.thickness,
        type = _charts$index.type;
      var calcValues = stackedChartType[type] ? values[0] : values;
      return calcs(calcValues, {
        bounds: chartBounds[index],
        direction: direction,
        steps: steps,
        thickness: thickness
      });
    });
  }, [axis, boundsProp, charts, chartValues, data, direction, granularities, horizontal]);

  // normalize how we style data properties for use by Legend and Detail
  var seriesStyles = useMemo(function () {
    var result = {};
    // start from what we were explicitly given
    charts.forEach(function (chart, index) {
      var calcThickness = chartProps[index].thickness;
      if (typeof chart.property === 'object' && !Array.isArray(chart.property)) {
        // data driven point chart
        Object.keys(chart.property).forEach(function (aspect) {
          var prop = chart.property[aspect];
          if (!result[prop.property || prop]) result[prop.property || prop] = {
            aspect: aspect
          };
        });
      } else {
        var setPropertyStyle = function setPropertyStyle(_ref6) {
          var property = _ref6.property,
            styles = _objectWithoutPropertiesLoose(_ref6, _excluded2);
          // keep what we've got, use what is new
          result[property] = _extends({}, styles, result[property] || {});
          // unless the new style is has no opacity
          if (!styles.opacity) delete result[property].opacity;
          if (styles.type === 'point') result[property].point = false;
          if (calcThickness && !result[property].thickness) result[property].thickness = calcThickness;
        };
        if (Array.isArray(chart.property)) chart.property.forEach(function (prop) {
          if (typeof prop === 'string') setPropertyStyle(_extends({}, chart, {
            property: prop
          }));else if (typeof prop === 'object') setPropertyStyle(_extends({}, chart, prop));
        });else if (typeof chart === 'object') setPropertyStyle(chart);else if (typeof chart === 'string') setPropertyStyle({
          property: chart
        });
      }
    });

    // set color for any non-aspect properties we don't have one for yet
    var colorIndex = 0;
    var pointIndex = 0;
    Object.keys(result).forEach(function (key) {
      var seriesStyle = result[key];
      if (!seriesStyle.aspect && !seriesStyle.color) {
        seriesStyle.color = "graph-" + colorIndex;
        colorIndex += 1;
      }
      // set opacity if it isn't set and this isn't the active property
      if (activeProperty !== undefined && activeProperty !== key) {
        seriesStyle.opacity = 'medium';
      }
      if (seriesStyle.point === false) {
        seriesStyle.point = points[pointIndex];
        pointIndex += 1;
      }
    });
    return result;
  }, [activeProperty, charts, chartProps]);

  // normalize guide
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
    }
    // set counts
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
  }, [axis, granularities, guideProp]);

  // set the pad to half the thickness, based on the chart types
  // except when using offset, then add even more horizontal pad
  var pad = useMemo(function () {
    if (padProp !== undefined) return padProp;
    var pad0;
    var pad1;
    charts.forEach(function (_ref7, index) {
      var type = _ref7.type;
      var thickness = chartProps[index].thickness;
      pad0 = largestSize(pad0, halfPad[thickness]);
      if (type && type !== 'bar') pad1 = largestSize(pad1, halfPad[thickness]);
    });
    return horizontal ? {
      horizontal: pad1,
      vertical: pad0
    } : {
      horizontal: pad0,
      vertical: pad1
    };
  }, [chartProps, charts, horizontal, padProp]);

  // calculate the thickness in pixels of each chart
  var thicknesses = useMemo(function () {
    return offset ? charts.map(function (_, index) {
      var thickness = chartProps[index].thickness;
      return parseMetricToNum(theme.global.edgeSize[thickness] || thickness);
    }) : undefined;
  }, [charts, chartProps, offset, theme]);

  // normalize any offset gap
  var offsetGap = useMemo(function () {
    return (offset == null ? void 0 : offset.gap) && parseMetricToNum(theme.global.edgeSize[offset.gap] || offset.gap) || 0;
  }, [offset, theme]);

  // calculate the offset for each chart, which is a sum of the thicknesses
  // any offset gaps that preceded it
  var offsets = useMemo(function () {
    if (offset) {
      return thicknesses.map(function (t, i) {
        return thicknesses.slice(0, i).reduce(function (a, b) {
          return a + b + offsetGap;
        }, 0);
      });
    }
    return undefined;
  }, [offset, offsetGap, thicknesses]);

  // Calculate the total pad we should add to the end of each chart.
  // We do this to shrink the width of each chart so we can shift them
  // via `translate` and have them take up the right amount of width.
  var offsetPad = useMemo(function () {
    return offsets ? offsets[offsets.length - 1] + thicknesses[thicknesses.length - 1] + "px" : undefined;
  }, [offsets, thicknesses]);

  // The thickness of the segments. We need to convert to numbers
  // to be able to compare across charts where some might be using T-shirt
  // labels and others might be pixel values.
  var segmentThickness = useMemo(function () {
    var result = 0;
    charts.forEach(function (_, index) {
      var thickness = chartProps[index].thickness;
      result = Math.max(result, parseMetricToNum(theme.global.edgeSize[thickness] || thickness));
    });
    return result + "px";
  }, [charts, chartProps, theme]);
  var dateFormats = useMemo(function () {
    var result = {};
    var full = axis && axis.x && axis.x.granularity === 'coarse';
    series.forEach(function (_ref8) {
      var property = _ref8.property,
        render = _ref8.render;
      if (!render && data.length > 1 && typeof data[0][property] === 'string') {
        result[property] = createDateFormat(data[0][property], data[data.length - 1][property], full);
      }
    });
    return result;
  }, [axis, data, series]);
  var renderValue = function renderValue(serie, axisValue, y) {
    if (serie === void 0) {
      serie = {};
    }
    var _serie = serie,
      prefix = _serie.prefix,
      property = _serie.property,
      render = _serie.render,
      suffix = _serie.suffix;
    var value = axisValue;
    if (value !== undefined) {
      if (!property || !horizontal && y || horizontal && !y) {
        if (render) return render(value);
      } else {
        var datum = data[axisValue];
        value = datum[property];
        if (render) return render(value, datum, property);
      }
      if (property) {
        var dateFormat = dateFormats[property];
        if (dateFormat) return dateFormat(new Date(value));
        if (prefix) value = "" + prefix + value;
        if (suffix) value = "" + value + suffix;
      }
    }
    return value;
  };

  // TODO: revisit how x/y axis are hooked up to charts and series

  var xAxisElement = axis && axis.x && (chartProps.length || boundsProp != null && boundsProp.x) ? /*#__PURE__*/React.createElement(XAxis, {
    axis: axis,
    values: (boundsProp == null || (_boundsProp$x = boundsProp.x) == null ? void 0 : _boundsProp$x.slice(0)) || (Array.isArray(chartProps[0]) ? chartProps[0][0] : chartProps[0]).axis.x,
    pad: !horizontal && offsetPad ? _extends({}, pad, {
      end: offsetPad
    }) : pad,
    renderValue: renderValue,
    serie: axis.x.property && getPropertySeries(axis.x.property),
    style: offsetPad ? {
      transform: "translate(" + offsets[Math.floor(offsets.length / 2)] + "px, 0px)"
    } : {},
    thickness: horizontal ? undefined : segmentThickness,
    theme: theme
  }) : null;
  var yAxisElement = axis && axis.y && (chartProps.length || boundsProp != null && boundsProp.y) ? /*#__PURE__*/React.createElement(YAxis, {
    axis: axis,
    values: (boundsProp == null || (_boundsProp$y = boundsProp.y) == null ? void 0 : _boundsProp$y.slice(0).reverse()) || (Array.isArray(chartProps[0]) ? chartProps[0][0] : chartProps[0]).axis.y,
    pad: horizontal && offsetPad ? _extends({}, pad, {
      bottom: offsetPad
    }) : pad,
    renderValue: renderValue,
    serie: axis.y.property && getPropertySeries(axis.y.property),
    thickness: horizontal ? segmentThickness : undefined,
    theme: theme
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
    pad: pad,
    thickness: horizontal
  }), guide && guide.y && /*#__PURE__*/React.createElement(YGuide, {
    guide: guide,
    pad: pad,
    thickness: !horizontal
  }), charts.map(function (_ref9, i) {
    var prop = _ref9.property,
      type = _ref9.type,
      x = _ref9.x,
      y = _ref9.y,
      chartRest = _objectWithoutPropertiesLoose(_ref9, _excluded3);
    // When we offset, we increase the padding on the end for all charts
    // by the same amount and we shift each successive chart to the
    // right by an offset for that chart. The last chart's right side
    // will end up aligning with where the charts would have been
    // had we not padded their ends.
    var chartPad = offsetPad ? _extends({}, pad, {
      end: offsetPad
    }) : pad;
    var offsetProps = offsetPad ? {
      style: {
        transform: "translate(" + offsets[i] + "px, 0px)"
      }
    } : {};
    if (stackedChartType[type]) {
      // reverse to ensure area Charts are stacked in the right order
      return prop.map(function (cProp, j) {
        var pProp = cProp.property || cProp;
        var _ref10 = typeof cProp === 'object' ? cProp : {},
          property = _ref10.property,
          propRest = _objectWithoutPropertiesLoose(_ref10, _excluded4);
        return /*#__PURE__*/React.createElement(Chart
        // eslint-disable-next-line react/no-array-index-key
        , _extends({
          key: j
          // when property name isn't valid, send empty array
          ,
          values: chartValues[i][j] || [],
          overflow: true,
          direction: direction
        }, seriesStyles[pProp], chartProps[i], chartRest, propRest, offsetProps, {
          type: stackedChartType[type] || type,
          size: size,
          pad: chartPad
        }));
      }).reverse();
    }
    return /*#__PURE__*/React.createElement(Chart
    // eslint-disable-next-line react/no-array-index-key
    , _extends({
      key: i,
      values: chartValues[i],
      overflow: true,
      direction: direction
    }, seriesStyles[prop], chartProps[i], chartRest, offsetProps, {
      type: type,
      size: size,
      pad: chartPad
    }));
  }), placeholder && (typeof placeholder === 'string' && /*#__PURE__*/React.createElement(Box, {
    fill: "vertical",
    align: "center",
    justify: "center",
    background: {
      color: 'background-front',
      opacity: 'strong'
    },
    margin: pad
  }, /*#__PURE__*/React.createElement(Text, {
    color: "text-weak"
  }, placeholder)) || placeholder), detail && /*#__PURE__*/React.createElement(Detail, {
    activeProperty: activeProperty,
    axis: axis,
    data: data,
    horizontal: horizontal,
    pad: pad,
    series: series,
    seriesStyles: seriesStyles,
    renderValue: renderValue,
    thickness: segmentThickness
  }));
  var legendElement = legend ? /*#__PURE__*/React.createElement(Legend, {
    series: series,
    seriesStyles: seriesStyles,
    activeProperty: activeProperty,
    setActiveProperty: setActiveProperty
  }) : null;
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
DataChart.propTypes = DataChartPropTypes;
export { DataChart };