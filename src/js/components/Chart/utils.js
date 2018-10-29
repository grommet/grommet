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
