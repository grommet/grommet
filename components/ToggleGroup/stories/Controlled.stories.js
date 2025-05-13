"use strict";

exports.__esModule = true;
exports["default"] = exports.Controlled = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var Controlled = exports.Controlled = function Controlled() {
  var _useState = (0, _react.useState)(['Option 2']),
    value = _useState[0],
    setValue = _useState[1];
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    gap: "xlarge",
    overflow: "auto"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    gap: "large",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "In multiple selection mode, enforce at least one selection."), /*#__PURE__*/_react["default"].createElement(_grommet.ToggleGroup, {
    options: ['Option 1', 'Option 2', 'Option 3'],
    value: value,
    onToggle: function onToggle(e) {
      if (e.value.length) setValue(e.value);
    },
    multiple: true
  })));
};
var _default = exports["default"] = {
  title: 'Controls/ToggleGroup/Controlled'
};