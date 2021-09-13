import { useEffect, useRef } from 'react';
import { useLayoutEffect } from './use-isomorphic-layout-effect';

const updateRef = (ref, innerRef) => {
  if (!ref) return;
  if (typeof ref === 'function') {
    ref(innerRef.current);
  } else {
    // eslint-disable-next-line no-param-reassign
    ref.current = innerRef.current;
  }
};

// https://medium.com/the-non-traditional-developer/how-to-use-the-forwarded-ref-in-react-1fb108f4e6af
export const useForwardedRef = (ref) => {
  const innerRef = useRef(null);
  updateRef(ref, innerRef);
  useLayoutEffect(() => updateRef(ref, innerRef));
  useEffect(() => updateRef(ref, innerRef));
  return innerRef;
};
