"use strict";

exports.__esModule = true;
exports.useId = void 0;
var _react = _interopRequireWildcard(require("react"));
var _React$useId;
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var currentId = 0;
var getId = function getId() {
  // eslint-disable-next-line no-plusplus
  var id = currentId++;
  return ":r" + id.toString(32) + ":";
};
var useIdGrommet = function useIdGrommet() {
  var _useState = (0, _react.useState)(getId),
    id = _useState[0];
  return id;
};

// Polyfill React 18's useId for compatibility with React 16 and 17
var useId = exports.useId = (_React$useId = _react["default"].useId) != null ? _React$useId : useIdGrommet;