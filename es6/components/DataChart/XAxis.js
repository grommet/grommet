var _excluded = ["values", "pad", "renderValue", "serie"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef } from 'react';
import { Box } from '../Box';
var XAxis = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var values = _ref.values,
      pad = _ref.pad,
      renderValue = _ref.renderValue,
      serie = _ref.serie,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);

  // When there are only labels at the end of the axis, let them take as much
  // space as they like. If there are more, align their container to the
  // data/guide lines and then let their content overflow that.
  var itemProps = values.length === 2 ? {} : {
    width: '1px',
    overflow: 'visible',
    align: 'center'
  };
  var horizontal = pad.horizontal,
      start = pad.start,
      end = pad.end; // ignore vertical parts

  return /*#__PURE__*/React.createElement(Box, _extends({
    ref: ref,
    gridArea: "xAxis",
    direction: "row",
    justify: "between",
    pad: {
      horizontal: horizontal,
      start: start,
      end: end
    }
  }, rest), values.map(function (dataIndex, i) {
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