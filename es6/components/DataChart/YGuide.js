function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { forwardRef } from 'react';
import { Box } from '../Box';
var YGuide = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var guide = _ref.guide,
    padArg = _ref.pad,
    thickness = _ref.thickness;
  var pad = padArg;
  if (thickness) {
    // omit any horizontal pad so the guides cover the thickness that
    // is within the pad
    if (typeof padArg === 'object') pad = _extends({}, padArg, {
      start: 'none',
      end: 'none'
    });else if (typeof padArg === 'string') pad = {
      vertical: padArg
    };
  }
  return /*#__PURE__*/React.createElement(Box, {
    ref: ref,
    fill: true,
    justify: "between",
    pad: pad,
    responsive: false
  }, Array.from({
    length: guide.y.count
  }).map(function (_, i) {
    return (
      /*#__PURE__*/
      // eslint-disable-next-line react/no-array-index-key
      React.createElement(Box, {
        key: i,
        border: "top"
      })
    );
  }));
});
export { YGuide };