import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { defaultProps } from '../default-props';

export const useDebounce = (debounceDelay) => {
  const [func, setFunc] = useState();
  const theme = useContext(ThemeContext) || defaultProps.theme;
  const delay = debounceDelay || theme.global.debounceDelay;
  useEffect(() => {
    let timer;
    if (func) timer = setTimeout(() => func(), delay);
    return () => clearTimeout(timer);
  }, [func, delay]);

  return setFunc;
};

export default useDebounce;
