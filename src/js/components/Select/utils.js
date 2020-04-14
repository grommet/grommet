export const applyKey = (option, key) => {
  if (typeof key === 'object') return applyKey(option, key.key);
  if (typeof key === 'function') return key(option);
  if (key) return option[key];
  return option;
};
