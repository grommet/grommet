"use strict";

exports.__esModule = true;
exports.ParagraphSkeleton = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = require("styled-components");
var _defaultProps = require("../../default-props");
var _Skeleton = require("../Skeleton");
var _Box = require("../Box");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var ParagraphSkeleton = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var fill = _ref.fill,
    sizeProp = _ref.size;
  var theme = (0, _react.useContext)(_styledComponents.ThemeContext) || _defaultProps.defaultProps.theme;
  var size = sizeProp || 'medium';
  var data = theme.paragraph[size];
  var height = data ? data.size : size;
  return /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    ref: ref,
    gap: "xsmall",
    width: {
      max: fill ? 'none' : data && data.maxWidth
    }
  }, /*#__PURE__*/_react["default"].createElement(_Skeleton.Skeleton, {
    height: height
  }), /*#__PURE__*/_react["default"].createElement(_Skeleton.Skeleton, {
    height: height
  }), /*#__PURE__*/_react["default"].createElement(_Skeleton.Skeleton, {
    height: height,
    width: "30%"
  }));
});
exports.ParagraphSkeleton = ParagraphSkeleton;
ParagraphSkeleton.displayName = 'ParagraphSkeleton';