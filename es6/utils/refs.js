import { useImperativeHandle, useRef } from 'react';
export var useForwardedRef = function useForwardedRef(ref) {
  var innerRef = useRef(null);
  useImperativeHandle(ref, function () {
    return innerRef.current;
  }, [innerRef]);
  return innerRef;
};