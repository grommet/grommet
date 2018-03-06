export function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

export function deepFreeze(obj) {
  Object.keys(obj).forEach(
    key => key && isObject(obj[key]) && Object.freeze(obj[key])
  );
  return Object.freeze(obj);
}

export function deepMerge(target, ...sources) {
  if (!sources.length) {
    return target;
  }
  // making sure to not change target (immutable)
  const output = { ...target };
  const source = sources.shift();
  if (isObject(output) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!output[key]) {
          output[key] = { ...source[key] };
        } else {
          output[key] = deepMerge({}, output[key], source[key]);
        }
      } else {
        output[key] = source[key];
      }
    });
  }
  return deepMerge(output, ...sources);
}

export function removeUndefined(obj) {
  const result = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] !== undefined) {
      result[key] = obj[key];
    }
  });
  return result;
}

export default { deepFreeze, deepMerge, isObject, removeUndefined };
