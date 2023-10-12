import { useImperativeHandle, useRef } from 'react';

export const useForwardedRef = (ref) => {
  const innerRef = useRef(null);
  useImperativeHandle(ref, () => innerRef.current, [innerRef]);
  return innerRef;
};
