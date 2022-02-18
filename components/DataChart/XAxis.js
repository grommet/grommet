"use strict";

exports.__esModule = true;
exports.XAxis = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Box = require("../Box");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var XAxis = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var chartProps = _ref.chartProps,
      pad = _ref.pad,
      renderValue = _ref.renderValue,
      serie = _ref.serie;
  // pull the x-axis values from the first chart, all should have the same
  var _axis = (Array.isArray(chartProps[0]) ? chartProps[0][0] : chartProps[0]).axis,
      axisValues = _axis[0]; // When there are only labels at the end of the axis, let them take as much
  // space as they like. If there are more, align their container to the
  // data/guide lines and then let their content overflow that.

  var itemProps = axisValues.length === 2 ? {} : {
    width: '1px',
    overflow: 'visible',
    align: 'center'
  };
  return /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    ref: ref,
    gridArea: "xAxis",
    direction: "row",
    justify: "between",
    pad: pad != null && pad.horizontal ? {
      horizontal: pad.horizontal
    } : undefined
  }, axisValues.map(function (dataIndex, i) {
    return (
      /*#__PURE__*/
      // eslint-disable-next-line react/no-array-index-key
      _react["default"].createElement(_Box.Box, _extends({
        key: i
      }, itemProps), serie ? renderValue(serie, dataIndex) : dataIndex)
    );
  }));
});
exports.XAxis = XAxis;