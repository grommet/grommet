"use strict";

exports.__esModule = true;
exports.useId = void 0;
var _react = _interopRequireWildcard(require("react"));
var _React$useId;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
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