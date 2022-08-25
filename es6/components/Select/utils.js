export var applyKey = function applyKey(option, key) {
  if (option === undefined) return undefined;
  if (typeof key === 'object') return applyKey(option, key.key);
  if (typeof key === 'function') return key(option);
  if (key !== undefined) return option[key];
  if (typeof option === 'object' && Object.keys(option)) return option[Object.keys(option)[0]];
  return option;
};