"use strict";

exports.__esModule = true;
exports.useForwardedRef = void 0;

var _react = require("react");

var _useIsomorphicLayoutEffect = require("./use-isomorphic-layout-effect");

var updateRef = function updateRef(ref, innerRef) {
  if (!ref) return;

  if (typeof ref === 'function') {
    ref(innerRef.current);
  } else {
    // eslint-disable-next-line no-param-reassign
    ref.current = innerRef.current;
  }
}; // https://medium.com/the-non-traditional-developer/how-to-use-the-forwarded-ref-in-react-1fb108f4e6af


var useForwardedRef = function useForwardedRef(ref) {
  var innerRef = (0, _react.useRef)(null);
  updateRef(ref, innerRef);
  (0, _useIsomorphicLayoutEffect.useLayoutEffect)(function () {
    return updateRef(ref, innerRef);
  });
  (0, _react.useEffect)(function () {
    return updateRef(ref, innerRef);
  });
  return innerRef;
};

exports.useForwardedRef = useForwardedRef;