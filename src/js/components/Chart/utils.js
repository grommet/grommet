export const normalizeValues = values =>
  (values || []).map((value, index) => {
    if (Array.isArray(value)) {
      return { value };
    }
    if (typeof value === 'number') {
      return { value: [index, value] };
    }
    return value;
  });

export const normalizeBounds = (bounds, values) => {
  let result = bounds;
  if (!result) {
    result = [[0, 1], [0, 1]];
    (values || []).forEach(value => {
      result[0][0] = Math.min(result[0][0], value.value[0]);
      result[0][1] = Math.max(result[0][1], value.value[0]);
      result[1][0] = Math.min(result[1][0], value.value[1]);
      result[1][1] = Math.max(result[1][1], value.value[1]);
    });
  }
  return result;
};

export const areNormalizedValuesEquals = (valuesX, valuesY) => {
  if (!valuesX || !valuesY) return false;

  if (valuesX.length !== valuesY.length) return false;

  if (valuesX.length === 0) return true;

  if (!valuesX[0].value || !valuesY[0].value) return false;

  return valuesX.every((_, i) =>
    valuesX[i].value.every((value, index) => value === valuesY[i].value[index]),
  );
};

export const areNormalizedBoundsEquals = (boundsX, boundsY) => {
  if (!boundsX || !boundsY) return false;

  if (boundsX.length !== boundsY.length || !(boundsX.length > 0)) return false;

  return boundsX.every((_, i) =>
    boundsX[i].every((value, index) => value === boundsY[i][index]),
  );
};
