"use strict";

exports.__esModule = true;
exports["default"] = exports.Children = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _grommetIcons = require("grommet-icons");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var optionsObjects = [{
  label: 'asc',
  disabled: true,
  value: 'asc'
}, {
  label: 'desc',
  value: 'desc'
}];
var Children = exports.Children = function Children() {
  var _useState = (0, _react.useState)(),
    value = _useState[0],
    setValue = _useState[1];
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.CheckBoxGroup, {
    name: "checkbox",
    direction: "row",
    gap: "xsmall",
    options: optionsObjects,
    value: value,
    onChange: function onChange(_ref) {
      var nextValue = _ref.value;
      return setValue(nextValue);
    }
  }, function (option, _ref2) {
    var checked = _ref2.checked;
    var Icon = option.value === 'asc' ? _grommetIcons.Ascend : _grommetIcons.Descend;
    var background;
    if (checked) background = 'brand';else background = 'light-2';
    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      background: background,
      pad: "xsmall"
    }, /*#__PURE__*/_react["default"].createElement(Icon, null));
  }));
};
var _default = exports["default"] = {
  title: 'Input/CheckBoxGroup/Children'
};