import { useEffect, useRef } from 'react'; // https://medium.com/the-non-traditional-developer/how-to-use-the-forwarded-ref-in-react-1fb108f4e6af

export var useForwardedRef = function useForwardedRef(ref) {
  var innerRef = useRef(null);
  useEffect(function () {
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