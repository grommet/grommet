"use strict";

exports.__esModule = true;
exports.YAxis = void 0;
var _react = _interopRequireWildcard(require("react"));
var _utils = require("../../utils");
var _Box = require("../Box");
var _utils2 = require("./utils");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var onlyVerticalPad = function onlyVerticalPad(pad) {
  var result;
  if (pad) {
    if (typeof pad === 'string') result = {
      vertical: pad
    };else result = {
      vertical: pad.vertical,
      top: pad.top,
      bottom: pad.bottom
    };
  }
  return result;
};
var YAxis = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var values = _ref.values,
    padProp = _ref.pad,
    renderValue = _ref.renderValue,
    serie = _ref.serie,
    theme = _ref.theme,
    thickness = _ref.thickness;
  var _ref2 = serie || {},
    render = _ref2.render,
    suffix = _ref2.suffix;

  // pad to the edge of the thickness, for when padding is more than half
  // the thickness
  var pad = (0, _react.useMemo)(function () {
    return padProp && thickness && {
      top: (0, _utils.edgeToNum)(padProp.top || padProp.vertical, theme) - (0, _utils.edgeToNum)(thickness, theme) / 2 + "px",
      bottom: (0, _utils.edgeToNum)(padProp.bottom || padProp.vertical, theme) - (0, _utils.edgeToNum)(thickness, theme) / 2 + "px"
    } || onlyVerticalPad(padProp);
  }, [padProp, theme, thickness]);

  // When there are only labels at the end of the axis and there isn't
  // much space for them, let them take as much space as they like
  // flowing in from the edges.
  // Otherwise, align their container to the
  // data/guide lines and then let their content overflow that.
  var labelContainerProps = (0, _react.useMemo)(function () {
    // 24px was chosen empirically as 48px is enough to show some simple text
    var centered = values.length !== 2 || (0, _utils.edgeToNum)((padProp == null ? void 0 : padProp.start) || (padProp == null ? void 0 : padProp.horizontal), theme) >= 24;
    if (centered) return {
      basis: thickness || '1px',
      overflow: 'visible',
      justify: 'center'
    };
    return {};
  }, [padProp, theme, thickness, values]);
  return /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    ref: ref,
    gridArea: "yAxis",
    justify: "between",
    flex: true,
    pad: pad
  }, values.map(function (axisValue, i) {
    var content = serie ? renderValue(serie, axisValue, true) : axisValue;
    if (content === axisValue && !render && !suffix) {
      var maxValue = Math.max.apply(Math, values.map(function (v) {
        return Math.abs(v);
      }));
      content = (0, _utils2.showInUnits)(content, maxValue);
    }
    return /*#__PURE__*/_react["default"].createElement(_Box.Box
    // eslint-disable-next-line react/no-array-index-key
    , _extends({
      key: i,
      align: "end"
    }, labelContainerProps), content);
  }));
});
exports.YAxis = YAxis;