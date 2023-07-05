export var normalizeValues = function normalizeValues(values) {
  return (values || []).map(function (value, index) {
    if (value === undefined) return {
      value: [index, undefined]
    };
    if (Array.isArray(value)) return {
      value: value
    };
    if (typeof value === 'object') return value;
    return {
      value: [index, value]
    };
  });
};
export var calcMinMax = function calcMinMax(values, direction) {
  var _ref, _ref2, _ref3, _ref4;
  if (values === void 0) {
    values = [];
  }
  // We default to 0 minimum as that's typically what's wanted.
  // If callers want a narrower band, they can pass bounds explicitly.
  var min0 = (_ref = direction && 0) != null ? _ref : undefined;
  var max0 = (_ref2 = direction && 1) != null ? _ref2 : undefined;
  var min1 = (_ref3 = direction && 0) != null ? _ref3 : undefined;
  var max1 = (_ref4 = direction && 1) != null ? _ref4 : undefined;
  values.forEach(function (value) {
    var _value$value = value.value,
      val0 = _value$value[0],
      val1 = _value$value[1],
      val2 = _value$value[2];
    if (val0 !== undefined) {
      min0 = min0 === undefined ? val0 : Math.min(min0, val0);
      max0 = max0 === undefined ? val0 : Math.max(max0, val0);
    }
    if (val1 !== undefined) {
      min1 = min1 === undefined ? val1 : Math.min(min1, val1);
      max1 = max1 === undefined ? val1 : Math.max(max1, val1);
    }
    if (val2 !== undefined) {
      min1 = min1 === undefined ? val2 : Math.min(min1, val2);
      max1 = max1 === undefined ? val2 : Math.max(max1, val2);
    }
  });

  // when max === min, offset them so we can show something
  if (max0 === min0) {
    if (max0 > 0) min0 = max0 - 1;else max0 = min0 + 1;
  }
  if (max1 === min1) {
    if (max1 > 0) min1 = max1 - 1;else max1 = min1 + 1;
  }
  return direction === 'horizontal' ? {
    x: {
      min: min1,
      max: max1
    },
    y: {
      min: min0,
      max: max0
    }
  } : {
    x: {
      min: min0,
      max: max0
    },
    y: {
      min: min1,
      max: max1
    }
  };
};
export var normalizeBounds = function normalizeBounds(boundsProp, values, direction) {
  var result;
  if (Array.isArray(boundsProp)) result = {
    x: {
      min: boundsProp[0][0],
      max: boundsProp[0][1]
    },
    y: {
      min: boundsProp[1][0],
      max: boundsProp[1][1]
    }
  };else if (typeof boundsProp === 'object') result = boundsProp;else result = calcMinMax(values, direction);
  return result;
};
export var areNormalizedValuesEquals = function areNormalizedValuesEquals(valuesX, valuesY) {
  console.warn("This function will be removed in the upcoming releases.\nPlease get in touch with us if you have concerns.");
  if (!valuesX || !valuesY) return false;
  if (valuesX.length !== valuesY.length) return false;
  if (valuesX.length === 0) return true;
  if (!valuesX[0].value || !valuesY[0].value) return false;
  return valuesX.every(function (_, i) {
    return valuesX[i].value.every(function (value, index) {
      return value === valuesY[i].value[index];
    });
  });
};
export var areNormalizedBoundsEquals = function areNormalizedBoundsEquals(boundsX, boundsY) {
  console.warn("This function will be removed in the upcoming releases.\nPlease get in touch with us if you have concerns.");
  if (!boundsX || !boundsY) return false;
  if (boundsX.length !== boundsY.length || !(boundsX.length > 0)) return false;
  return boundsX.every(function (_, i) {
    return boundsX[i].every(function (value, index) {
      return value === boundsY[i][index];
    });
  });
};