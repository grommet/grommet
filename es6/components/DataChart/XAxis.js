function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { forwardRef } from 'react';
import { Box } from '../Box';
var XAxis = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var values = _ref.values,
      pad = _ref.pad,
      renderValue = _ref.renderValue,
      serie = _ref.serie;
  // When there are only labels at the end of the axis, let them take as much
  // space as they like. If there are more, align their container to the
  // data/guide lines and then let their content overflow that.
  var itemProps = values.length === 2 ? {} : {
    width: '1px',
    overflow: 'visible',
    align: 'center'
  };
  return /*#__PURE__*/React.createElement(Box, {
    ref: ref,
    gridArea: "xAxis",
    direction: "row",
    justify: "between",
    pad: pad != null && pad.horizontal ? {
      horizontal: pad.horizontal
    } : undefined
  }, values.map(function (dataIndex, i) {
    return (
      /*#__PURE__*/
      // eslint-disable-next-line react/no-array-index-key
      React.createElement(Box, _extends({
        key: i
      }, itemProps), serie ? renderValue(serie, dataIndex) : dataIndex)
    );
  }));
});
export { XAxis };