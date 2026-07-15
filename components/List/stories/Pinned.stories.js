"use strict";

exports.__esModule = true;
exports["default"] = exports.Pinned = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var locations = ['Los Angelos', 'Boise', 'Fort Collins', 'Los Gatos', 'Palo Alto', 'Pheonix', 'San Francisco', 'Trenton'];
var pinnedLocations = ['Los Angelos', 'Fort Collins', 'Palo Alto', 'Pheonix', 'Trenton'];
var Pinned = exports.Pinned = function Pinned() {
  var _useState = (0, _react.useState)(locations),
    ordered = _useState[0],
    setOrder = _useState[1];
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.List, {
    "aria-label": "pinned list",
    data: ordered,
    onOrder: setOrder,
    pinned: pinnedLocations
  }));
};
var _default = exports["default"] = {
  title: 'Visualizations/List/Pinned'
};