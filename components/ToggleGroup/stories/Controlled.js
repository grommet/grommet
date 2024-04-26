"use strict";

exports.__esModule = true;
exports["default"] = exports.Controlled = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
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