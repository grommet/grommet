import React, { forwardRef } from 'react';
import { Box } from '../Box';
var XGuide = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var guide = _ref.guide,
      pad = _ref.pad;
  return /*#__PURE__*/React.createElement(Box, {
    ref: ref,
    fill: true,
    direction: "row",
    justify: "between",
    pad: pad,
    responsive: false
  }, Array.from({
    length: guide.x.count
  }).map(function (_, i) {
    return (
      /*#__PURE__*/
      // eslint-disable-next-line react/no-array-index-key
      React.createElement(Box, {
        key: i,
        border: "left"
      })
    );
  }));
});
export { XGuide };