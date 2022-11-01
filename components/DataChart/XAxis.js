"use strict";

exports.__esModule = true;
exports.XAxis = void 0;
var _react = _interopRequireWildcard(require("react"));
var _utils = require("../../utils");
var _Box = require("../Box");
var _excluded = ["values", "pad", "renderValue", "serie", "theme", "thickness"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var XAxis = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var values = _ref.values,
    padProp = _ref.pad,
    renderValue = _ref.renderValue,
    serie = _ref.serie,
    theme = _ref.theme,
    thickness = _ref.thickness,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  // pad to the edge of the thickness, for when padding is more than half
  // the thickness
  var pad = (0, _react.useMemo)(function () {
    return {
      start: (0, _utils.edgeToNum)(padProp.start || padProp.horizontal, theme) - (0, _utils.edgeToNum)(thickness, theme) / 2 + "px",
      end: (0, _utils.edgeToNum)(padProp.end || padProp.horizontal, theme) - (0, _utils.edgeToNum)(thickness, theme) / 2 + "px"
    };
  }, [padProp, theme, thickness]);

  // When there are only labels at the end of the axis and there isn't
  // much space for them, let them take as much space as they like
  // flowing in from the edges.
  // Otherwise, align their container to the
  // data/guide lines and then let their content overflow that.
  var labelContainerProps = (0, _react.useMemo)(function () {
    // 24px was chosen empirically as 48px is enough to show some simple text
    var centered = values.length !== 2 || (0, _utils.edgeToNum)(padProp.start || padProp.horizontal, theme) >= 24;
    if (centered) return {
      width: thickness,
      overflow: 'visible',
      align: 'center'
    };
    return {};
  }, [padProp, theme, thickness, values]);
  return /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
    ref: ref,
    gridArea: "xAxis",
    direction: "row",
    justify: "between",
    pad: pad
  }, rest), values.map(function (dataIndex, i) {
    return (
      /*#__PURE__*/
      // eslint-disable-next-line react/no-array-index-key
      _react["default"].createElement(_Box.Box, _extends({
        key: i
      }, labelContainerProps), serie ? renderValue(serie, dataIndex) : dataIndex)
    );
  }));
});
exports.XAxis = XAxis;