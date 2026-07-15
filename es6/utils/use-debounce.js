import { useEffect, useState } from 'react';
import { useThemeValue } from './useThemeValue';
export var useDebounce = function useDebounce(debounceDelay) {
  var _useState = useState(),
    func = _useState[0],
    setFunc = _useState[1];
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme;
  var delay = debounceDelay || theme.global.debounceDelay;
  useEffect(function () {
    var timer;
    if (func) timer = setTimeout(function () {
      return func();
    }, delay);
    return function () {
      return clearTimeout(timer);
    };
  }, [func, delay]);
  return setFunc;
};
export default useDebounce;