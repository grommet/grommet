import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { defaultProps } from '../default-props';
export var useDebounce = function useDebounce(debounceDelay) {
  var _useState = useState(),
    func = _useState[0],
    setFunc = _useState[1];
  var theme = useContext(ThemeContext) || defaultProps.theme;
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