export const normalizeValues = (values) =>
  (values || []).map((value, index) => {
    if (value === undefined) return { value: [index, undefined] };
    if (Array.isArray(value)) return { value };
    if (typeof value === 'object') return value;
    return { value: [index, value] };
  });

export const calcMinMax = (values = [], direction) => {
  // We default to 0 minimum as that's typically what's wanted.
  // If callers want a narrower band, they can pass bounds explicitly.
  let min0 = (direction && 0) ?? undefined;
  let max0 = (direction && 1) ?? undefined;
  let min1 = (direction && 0) ?? undefined;
  let max1 = (direction && 1) ?? undefined;

  values.forEach((value) => {
    const [val0, val1, val2] = value.value;
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
    if (max0 > 0) min0 = max0 - 1;
    else max0 = min0 + 1;
  }
  if (max1 === min1) {
    if (max1 > 0) min1 = max1 - 1;
    else max1 = min1 + 1;
  }

  return direction === 'horizontal'
    ? {
        x: { min: min1, max: max1 },
        y: { min: min0, max: max0 },
      }
    : {
        x: { min: min0, max: max0 },
        y: { min: min1, max: max1 },
      };
};

export const normalizeBounds = (boundsProp, values, direction) => {
  let result;
  if (Array.isArray(boundsProp))
    result = {
      x: { min: boundsProp[0][0], max: boundsProp[0][1] },
      y: { min: boundsProp[1][0], max: boundsProp[1][1] },
    };
  else if (typeof boundsProp === 'object') result = boundsProp;
  else result = calcMinMax(values, direction);
  return result;
};

export const areNormalizedValuesEquals = (valuesX, valuesY) => {
  console.warn(
    `This function will be removed in the upcoming releases.
Please get in touch with us if you have concerns.`,
  );

  if (!valuesX || !valuesY) return false;

  if (valuesX.length !== valuesY.length) return false;

  if (valuesX.length === 0) return true;

  if (!valuesX[0].value || !valuesY[0].value) return false;

  return valuesX.every((_, i) =>
    valuesX[i].value.every((value, index) => value === valuesY[i].value[index]),
  );
};

export const areNormalizedBoundsEquals = (boundsX, boundsY) => {
  console.warn(
    `This function will be removed in the upcoming releases.
Please get in touch with us if you have concerns.`,
  );

  if (!boundsX || !boundsY) return false;

  if (boundsX.length !== boundsY.length || !(boundsX.length > 0)) return false;

  return boundsX.every((_, i) =>
    boundsX[i].every((value, index) => value === boundsY[i][index]),
  );
};
