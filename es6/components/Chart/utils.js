export var normalizeValues = function normalizeValues(values) {
  return (values || []).map(function (value, index) {
    if (value === undefined) return {
      value: [index, undefined]
    };
    if (typeof value === 'number') return {
      value: [index, value]
    };
    if (Array.isArray(value)) return {
      value: value
    };
    return value;
  });
};
export var normalizeBounds = function normalizeBounds(bounds, values) {
  var result = bounds;

  if (!result) {
    result = [[0, 1], [0, 1]];
    (values || []).forEach(function (value) {
      if (value.value[0] !== undefined) {
        result[0][0] = Math.min(result[0][0], value.value[0]);
        result[0][1] = Math.max(result[0][1], value.value[0]);
      }

      if (value.value[1] !== undefined) {
        result[1][0] = Math.min(result[1][0], value.value[1]);
        result[1][1] = Math.max(result[1][1], value.value[1]);
      }

      if (value.value[2] !== undefined) {
        result[1][0] = Math.min(result[1][0], value.value[2]);
        result[1][1] = Math.max(result[1][1], value.value[2]);
      }
    });
  }

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