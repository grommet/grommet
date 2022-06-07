"use strict";

exports.__esModule = true;
exports.XAxis = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Box = require("../Box");

var _excluded = ["values", "pad", "renderValue", "serie"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var XAxis = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
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

  return /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
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
      _react["default"].createElement(_Box.Box, _extends({
        key: i
      }, itemProps), serie ? renderValue(serie, dataIndex) : dataIndex)
    );
  }));
});
exports.XAxis = XAxis;