import { useEffect, useRef } from 'react';
import { useLayoutEffect } from './use-isomorphic-layout-effect';

var updateRef = function updateRef(ref, innerRef) {
  if (!ref) return;

  if (typeof ref === 'function') {
    ref(innerRef.current);
  } else {
    // eslint-disable-next-line no-param-reassign
    ref.current = innerRef.current;
  }
}; // https://medium.com/the-non-traditional-developer/how-to-use-the-forwarded-ref-in-react-1fb108f4e6af


export var useForwardedRef = function useForwardedRef(ref) {
  var innerRef = useRef(null);
  updateRef(ref, innerRef);
  useLayoutEffect(function () {
    return updateRef(ref, innerRef);
  });
  useEffect(function () {
    return updateRef(ref, innerRef);
  });
  return innerRef;
};