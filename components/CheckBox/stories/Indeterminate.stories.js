"use strict";

exports.__esModule = true;
exports["default"] = exports.Indeterminate = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var Indeterminate = exports.Indeterminate = function Indeterminate() {
  var _useState = (0, _react.useState)([]),
    checked = _useState[0],
    setChecked = _useState[1];
  var checkboxes = ['fruits', 'vegetables', 'olive oil'];
  var onCheckAll = function onCheckAll(event) {
    if (event.target.checked) {
      setChecked(checkboxes);
    } else {
      setChecked([]);
    }
  };
  var onCheck = function onCheck(event, value) {
    if (event.target.checked) {
      setChecked([].concat(checked, [value]));
    } else {
      setChecked(checked.filter(function (item) {
        return item !== value;
      }));
    }
  };
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    gap: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.CheckBox, {
    checked: checked.length === 3,
    indeterminate: checked.length > 0 && checked.length < 3,
    label: "All",
    onChange: onCheckAll
  }), checkboxes.map(function (item) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.CheckBox, {
      key: item,
      checked: checked.includes(item),
      label: item,
      onChange: function onChange(e) {
        return onCheck(e, item);
      }
    });
  })));
};
var _default = exports["default"] = {
  title: 'Input/CheckBox/Indeterminate'
};