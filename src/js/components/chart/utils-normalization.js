// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import zip from 'lodash/zip';
import flatten from 'lodash/flatten';
import isInteger from 'lodash/isInteger';
import sortedIndexOf from 'lodash/sortedIndexOf';


/**
 * The normalization class includes a normalize method in order to help
 * the Chart consumers to normalize the series.
 *
 * Chart component assumes the array of values
 * (whether its for Line/Bar/Area/Axis) is always normalize and the points are
 * evenly spreader on the array.
 *
 * normalize func will normalize values in case of data-gaps and blank areas,
 * and will fill 'undefined' for the missing points added during normalization
 */

export class normalization {

  constructor() {
    this.getXAxis = this.getXAxis.bind(this);
    this.getXValues = this.getXValues.bind(this);
    this.getMinVal = this.getMinVal.bind(this);
    this.getMinVal = this.getMinVal.bind(this);
  }


  /**
   * Getting the xAxis values form a given array data structure
   *
   * @param data
   * return an array of all the xValues from the series map
   */
  getXValues (data) {
    if (!data) return [];
    return data.map(dataPoint => parseInt(dataPoint[0], 10));
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
   * @param Series array of 2D arrays
   * @param granularity the interval of the data points, uses '1' as default
   */

  getXAxis(Series, granularity) {
    const xValues = this.getXValues(flatten(Series));
    const max = this.getMaxVal(xValues);
    const min = this.getMinVal(xValues);

    if (!granularity) {
      // Possible to implement a calculator that with a given data points
      // will calculate the optimized granularity
      granularity = 1;
      console.warn('granularity was not defined for getXAxis calculation');
    }

    let normalizedXAxisLength = ( (max - min) / granularity) + 1;
    if (!isInteger(normalizedXAxisLength)) {
      console.warn('X values are not corresponding to the given granularity');
      normalizedXAxisLength = Math.floor(normalizedXAxisLength);
    }

    const normalizedXAxis = Array.apply(null, new Array(normalizedXAxisLength));
    return normalizedXAxis.map((x, i) => i * granularity + min);
  };

  /**
   * Getting the max value in an array
   *
   * @param arr
   * return a numeric value
   */
  getMinVal (arr) {
    return Math.min.apply(Math, arr);
  }

  /**
   * Getting the min value in an array
   *
   * @param arr
   * return a numeric value
   */
  getMaxVal (arr) {
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

  normalize(Series, granularity) {
    if (!Series) return {};
    let result = {};
    let normalizedYValues = [];
    const xAxis = this.getXAxis(Series, granularity);

    Series.map(series => {
      let seriesYValues = [];
      const seriesZip = zip(...series);
      xAxis.map(xValue => {
        const index = sortedIndexOf(seriesZip[0], xValue);
        if (index > -1) {
          seriesYValues.push(parseInt(seriesZip[1][index], 10));
        } else {
          seriesYValues.push(undefined);
        }
      });
      normalizedYValues.push(seriesYValues);
    });
    result.values = normalizedYValues;
    return result;
  };

}
