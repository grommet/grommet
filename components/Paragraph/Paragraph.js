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
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var Paragraph = exports.Paragraph = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
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
Paragraph.displayName = 'Paragraph';
Paragraph.prototype = _propTypes.ParagraphPropTypes;