"use strict";

exports.__esModule = true;
exports.XAxis = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Box = require("../Box");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var XAxis = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var chartProps = _ref.chartProps,
      data = _ref.data,
      renderValue = _ref.renderValue,
      serie = _ref.serie;
  // pull the x-axis values from the first chart, all should have the same
  var _axis = (Array.isArray(chartProps[0]) ? chartProps[0][0] : chartProps[0]).axis,
      axisValues = _axis[0];
  return /*#__PURE__*/_react["default"].createElement(_Box.Box, {
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
      _react["default"].createElement(_Box.Box, {
        key: i,
        flex: true,
        align: align
      }, serie ? renderValue(serie, dataIndex) : dataIndex)
    );
  }));
});
exports.XAxis = XAxis;