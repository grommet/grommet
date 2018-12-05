export const isObject = item =>
  item && typeof item === 'object' && !Array.isArray(item);

export const deepFreeze = obj => {
  Object.keys(obj).forEach(
    key => key && isObject(obj[key]) && Object.freeze(obj[key]),
  );
  return Object.freeze(obj);
};

export const deepMerge = (target, ...sources) => {
  if (!sources.length) {
    return target;
  }
  // making sure to not change target (immutable)
  const output = { ...target };
  sources.forEach(source => {
    if (isObject(source)) {
      Object.keys(source).forEach(key => {
        if (isObject(source[key])) {
          if (!output[key]) {
            output[key] = { ...source[key] };
          } else {
            output[key] = deepMerge(output[key], source[key]);
          }
        } else {
          output[key] = source[key];
        }
      });
    }
  });
  return output;
};

export const removeUndefined = obj => {
  const result = {};
  Object.keys(obj).forEach(key => {
    if (obj[key] !== undefined) {
      result[key] = obj[key];
    }
  });
  return result;
};

export const removeKeys = (obj, keys) => {
  const newObj = {};
  Object.keys(obj).forEach(key => {
    if (keys.indexOf(key) < 0) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};
