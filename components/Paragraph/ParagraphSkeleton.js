"use strict";

exports.__esModule = true;
exports.ParagraphSkeleton = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = require("styled-components");
var _defaultProps = require("../../default-props");
var _Skeleton = require("../Skeleton");
var _Box = require("../Box");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var ParagraphSkeleton = exports.ParagraphSkeleton = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
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
ParagraphSkeleton.displayName = 'ParagraphSkeleton';