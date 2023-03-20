"use strict";

exports.__esModule = true;
exports.Paragraph = void 0;
var _react = _interopRequireWildcard(require("react"));
var _StyledParagraph = require("./StyledParagraph");
var _propTypes = require("./propTypes");
var _Skeleton = require("../Skeleton");
var _ParagraphSkeleton = require("./ParagraphSkeleton");
var _TextContext = require("../Text/TextContext");
var _excluded = ["children", "color", "fill", "size"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var Paragraph = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var children = _ref.children,
    color = _ref.color,
    fill = _ref.fill,
    size = _ref.size,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var skeleton = (0, _Skeleton.useSkeleton)();
  var textContextValue = (0, _react.useMemo)(function () {
    return {
      size: size
    };
  }, [size]);
  if (skeleton) {
    return /*#__PURE__*/_react["default"].createElement(_ParagraphSkeleton.ParagraphSkeleton, _extends({
      ref: ref,
      fill: fill,
      size: size
    }, rest), children);
  }
  return /*#__PURE__*/_react["default"].createElement(_StyledParagraph.StyledParagraph, _extends({
    ref: ref,
    colorProp: color,
    fillProp: fill,
    size: size
  }, rest), children !== undefined ? /*#__PURE__*/_react["default"].createElement(_TextContext.TextContext.Provider, {
    value: textContextValue
  }, children) : undefined);
});
exports.Paragraph = Paragraph;
Paragraph.displayName = 'Paragraph';
Paragraph.prototype = _propTypes.ParagraphPropTypes;