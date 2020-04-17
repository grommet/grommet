"use strict";

exports.__esModule = true;
exports.useForwardedRef = void 0;

var _react = require("react");

// https://medium.com/the-non-traditional-developer/how-to-use-the-forwarded-ref-in-react-1fb108f4e6af
var useForwardedRef = function useForwardedRef(ref) {
  var innerRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
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

exports.useForwardedRef = useForwardedRef;