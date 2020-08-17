import React, { forwardRef } from 'react';
import { Box } from '../Box';
var XAxis = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var chartProps = _ref.chartProps,
      data = _ref.data,
      renderValue = _ref.renderValue,
      serie = _ref.serie;
  // pull the x-axis values from the first chart, all should have the same
  var _axis = (Array.isArray(chartProps[0]) ? chartProps[0][0] : chartProps[0]).axis,
      axisValues = _axis[0];
  return /*#__PURE__*/React.createElement(Box, {
    ref: ref,
    gridArea: "xAxis",
    direction: "row",
    justify: "between"
  }, axisValues.map(function (dataIndex, i) {
    var align;
    if (axisValues.length === data.length) align = 'center';else if (i === 0) align = 'start';else if (i === axisValues.length - 1) align = 'end';else align = 'center';
    return (
      /*#__PURE__*/
      // eslint-disable-next-line react/no-array-index-key
      React.createElement(Box, {
        key: i,
        flex: true,
        align: align
      }, serie ? renderValue(serie, dataIndex) : dataIndex)
    );
  }));
});
export { XAxis };