export const normalizeValues = (values) =>
  (values || []).map((value, index) => {
    if (value === undefined) return { value: [index, undefined] };
    if (Array.isArray(value)) return { value };
    if (typeof value === 'object') return value;
    return { value: [index, value] };
  });

export const normalizeBounds = (boundsProp, values, direction) => {
  const vertical = direction === 'vertical';
  let result;
  if (boundsProp) {
    if (vertical)
      result = {
        x: { min: boundsProp[1][0], max: boundsProp[1][1] },
        y: { min: boundsProp[0][0], max: boundsProp[0][1] },
      };
    else
      result = {
        x: { min: boundsProp[0][0], max: boundsProp[0][1] },
        y: { min: boundsProp[1][0], max: boundsProp[1][1] },
      };
  } else {
    let min0 = 0;
    let max0 = 1;
    let min1 = 0;
    let max1 = 1;
    (values || []).forEach((value) => {
      if (value.value[0] !== undefined) {
        min0 = Math.min(min0, value.value[0]);
        max0 = Math.max(max0, value.value[0]);
      }
      if (value.value[1] !== undefined) {
        min1 = Math.min(min1, value.value[1]);
        max1 = Math.max(max1, value.value[1]);
      }
      if (value.value[2] !== undefined) {
        min1 = Math.min(min1, value.value[2]);
        max1 = Math.max(max1, value.value[2]);
      }
    });
    if (vertical) {
      result = {
        x: { min: min1, max: max1 },
        y: { min: min0, max: max0 },
      };
    } else {
      result = {
        x: { min: min0, max: max0 },
        y: { min: min1, max: max1 },
      };
    }
  }
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
