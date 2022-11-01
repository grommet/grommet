"use strict";

exports.__esModule = true;
exports.PlaceholderBody = void 0;
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var PlaceholderBody = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var _ref$columns = _ref.columns,
    columns = _ref$columns === void 0 ? [] : _ref$columns,
    onSelect = _ref.onSelect,
    children = _ref.children;
  var colSpan = Math.max(columns.length + (onSelect ? 1 : 0), 1);
  return /*#__PURE__*/_react["default"].createElement("tbody", {
    ref: ref
  }, /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("td", {
    colSpan: colSpan
  }, children)));
});
exports.PlaceholderBody = PlaceholderBody;