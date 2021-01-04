import { useEffect, useRef } from 'react';

// https://medium.com/the-non-traditional-developer/how-to-use-the-forwarded-ref-in-react-1fb108f4e6af
export const useForwardedRef = ref => {
  const innerRef = useRef(null);
  useEffect(() => {
    if (!ref) return;
    if (typeof ref === 'function') {
      ref(innerRef.current);
    } else {
      // eslint-disable-next-line no-param-reassign
      ref.current = innerRef.current;
    }
  });

  return innerRef;
};
