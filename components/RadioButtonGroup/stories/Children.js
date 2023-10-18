"use strict";

exports.__esModule = true;
exports["default"] = exports.Children = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _grommetIcons = require("grommet-icons");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var Children = exports.Children = function Children() {
  var _useState = (0, _react.useState)(),
    value = _useState[0],
    setValue = _useState[1];
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.RadioButtonGroup, {
    name: "radio",
    direction: "row",
    gap: "xsmall",
    options: ['asc', 'desc'],
    value: value,
    onChange: function onChange(event) {
      return setValue(event.target.value);
    }
  }, function (option, _ref) {
    var checked = _ref.checked,
      focus = _ref.focus,
      hover = _ref.hover;
    var Icon = option === 'asc' ? _grommetIcons.Ascend : _grommetIcons.Descend;
    var background;
    if (checked) background = 'brand';else if (hover) background = 'light-4';else if (focus) background = 'light-4';else background = 'light-2';
    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      background: background,
      pad: "xsmall"
    }, /*#__PURE__*/_react["default"].createElement(Icon, null));
  }));
};
var _default = exports["default"] = {
  title: 'Input/RadioButtonGroup/Children'
};