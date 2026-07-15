"use strict";

exports.__esModule = true;
exports["default"] = exports.NoLabel = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _excluded = ["checked"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var SimpleCheckBox = function SimpleCheckBox(_ref) {
  var checkedProp = _ref.checked,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useState = (0, _react.useState)(!!checkedProp),
    checked = _useState[0],
    setChecked = _useState[1];
  var onChange = function onChange(event) {
    return setChecked(event.target.checked);
  };
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.CheckBox, _extends({}, rest, {
    checked: checked,
    onChange: onChange
  })));
};
var NoLabel = exports.NoLabel = function NoLabel() {
  return /*#__PURE__*/_react["default"].createElement(SimpleCheckBox, {
    a11yTitle: "Checkbox without a label"
  });
};
NoLabel.storyName = 'No label';
var _default = exports["default"] = {
  title: 'Input/CheckBox/No label'
};