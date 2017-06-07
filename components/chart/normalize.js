'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalize = normalize;

var _lodash = require('lodash.zip');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

/**
 * The normalize util includes a normalize method in order to help
 * the Chart consumers to normalize the series.
 *
 * Chart component assumes the array of values
 * (whether its for Line/Bar/Area/Axis) is always normalize and the points are
 * evenly spreader on the array.
 *
 * normalize func will normalize values in case of data-gaps and blank areas,
 * and will fill 'undefined' for the missing points added during normalization
 */

/**
 * Getting the xAxis values form a given array data structure
 *
 * @param data
 * return an array of all the xValues from the series map
 */
function getXValues(data) {
  if (!data) return [];
  return (data || []).map(function (dataPoint) {
    return parseInt(dataPoint[0], 10);
  });
};

/**
 * With a given a array of 2D arrays, the function will return the common
 * xAxis for all data-points distribute evenly
 *
 * Example 1 (granularity = 1):
 * series = [
 *           [[1,2],[3,3],[4,5]], //series
 *           [[0,4],[6,7]]
 *          ]
 *
 * return xAxis => [0,1,2,3,4,5,6]
 *
 *
 * Example 2 (granularity = 2):
 * series = [
 *           [[2,2],[4,3],[6,5]], //series
 *           [[4,4],[8,7]]
 *          ]
 *
 * return xAxis => [2,4,6,8]
 *
 *
 * Example 3 (granularity = 2):
 * series = [
 *           [[2,2],[6,5]],
 *           [[4,4],[10,7]]
 *          ]
 *
 * return xAxis => [2,4,6,8,10]
 *
 *
 * @param series array of 2D arrays
 * @param granularity the interval of the data points, uses '1' as default
 */

function getXAxis(series, granularity) {
  var flat = series;
  // Check whether the series has more than one set of values
  if (Array.isArray(series[0][0])) {
    flat = flatten(series);
  }

  var xValues = getXValues(flat);
  var max = getMaxVal(xValues);
  var min = getMinVal(xValues);

  if (!granularity) {
    // Possible to implement a calculator that with a given data points
    // will calculate the optimized granularity
    granularity = 1;
  }

  var normalizedXAxisLength = (max - min) / granularity + 1;
  if (!Number.isInteger(normalizedXAxisLength)) {
    console.warn('X values are not corresponding to the given granularity');
    normalizedXAxisLength = Math.floor(normalizedXAxisLength);
  }

  var normalizedXAxis = Array.apply(null, new Array(normalizedXAxisLength));
  return normalizedXAxis.map(function (x, i) {
    return i * granularity + min;
  });
};

/**
 * Getting the max value in an array
 *
 * @param arr
 * return a numeric value
 */
function getMinVal(arr) {
  return Math.min.apply(Math, arr);
}

/**
 * Getting the min value in an array
 *
 * @param arr
 * return a numeric value
 */
function getMaxVal(arr) {
  return Math.max.apply(Math, arr);
}

/**
 * normalize func will normalize the values in case of gaps and blank areas,
 * and fill 'undefined' for the missing points added during normalization
 * @param Series array of 2D arrays
 * @param granularity the interval of the data points,
 * uses '1' as default in case granularity is missing
 * @returns {{}}
 *
 * Assumptions:
 *  Arrays are sorted by x-values
 *  xValue will not appear more than once in a series
 *
 * Example 1 (simple):
 *
 * Series = [
 *           [[1,2],[3,3]] //series
 *           [[1,4],[6,7]]
 *          ]
 * xAxis = [1,2,3,4,5,6]
 * After Normalization = [
 *                        [2, u, 3, u, u, u],
 *                        [4, u, u, u, u, 7]
 *                       ]
 *
 * Example 2:
 *
 * Series = [
 *           [[1,2],[3,3],[4,5]], //series
 *           [[1,4],[6,7],[8,9]]
 *          ]
 *
 * xAxis = [1,2,3,4,5,6,7,8]
 * After Normalization = [
 *                        [2, u, 3, 5, u, u, u, u],
 *                        [4, u, u, u, u, 7, u, 9]
 *                       ]
 *
 * Example 3:
 *
 * Series = [
 *           [[1,2],[3,3],[4,5]], //series
 *           [[0,4],[6,7]]
 *          ]
 *
 * xAxis = [0,1,2,3,4,5,6]
 * After Normalization = [

 *                        [u, 2, u, 3, 5, u, u],
 *                        [4, u, u, u, u, u, 7]
 *                       ]
 *
 */
function normalize(Series, granularity) {

  if (!Series || Series.length === 0) {
    return { values: [] };
  }

  var result = {};
  var normalizedYValues = [];
  var xAxis = getXAxis(Series, granularity);

  //Handling the case of single array that needs to be normalized
  if (!Array.isArray(Series[0][0])) {
    var seriesYValues = [];
    var SeriesZip = _lodash2.default.apply(undefined, _toConsumableArray(Series));
    xAxis.map(function (xValue) {
      var index = SeriesZip[0].indexOf(xValue);
      if (index > -1) {
        seriesYValues.push(parseInt(SeriesZip[1][index], 10));
      } else {
        seriesYValues.push(undefined);
      }
    });
    normalizedYValues = seriesYValues;
  } else {
    Series.map(function (series) {
      var seriesYValues = [];
      var seriesZip = _lodash2.default.apply(undefined, _toConsumableArray(series));
      xAxis.map(function (xValue) {
        var index = seriesZip[0].indexOf(xValue);
        if (index > -1) {
          seriesYValues.push(parseInt(seriesZip[1][index], 10));
        } else {
          seriesYValues.push(undefined);
        }
      });
      normalizedYValues.push(seriesYValues);
    });
  }
  result.values = normalizedYValues;
  return result;
}

function flatten(series) {
  return series.reduce(function (x, y) {
    return x.concat(y);
  });
}