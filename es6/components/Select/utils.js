export var applyKey = function applyKey(option, key) {
  if (!option) return undefined;
  if (typeof key === 'object') return applyKey(option, key.key);
  if (typeof key === 'function') return key(option);
  if (key) return option[key];
  return option;
};