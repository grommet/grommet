import { useEffect, useState } from 'react';
import { useThemeValue } from './useThemeValue';

export const useDebounce = (debounceDelay) => {
  const [func, setFunc] = useState();
  const theme = useThemeValue();
  const delay = debounceDelay || theme.global.debounceDelay;
  useEffect(() => {
    let timer;
    if (func) timer = setTimeout(() => func(), delay);
    return () => clearTimeout(timer);
  }, [func, delay]);

  return setFunc;
};

export default useDebounce;
