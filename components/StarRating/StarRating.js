"use strict";

exports.__esModule = true;
exports.StarRating = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Star = require("grommet-icons/icons/Star");
var _StarOutline = require("grommet-icons/icons/StarOutline");
var _FormContext = require("../Form/FormContext");
var _RadioButtonGroup = require("../RadioButtonGroup");
var _useThemeValue = require("../../utils/useThemeValue");
var _excluded = ["name", "defaultValue", "value"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.indexOf(n) >= 0) continue; t[n] = r[n]; } return t; }
var StarRating = exports.StarRating = function StarRating(_ref) {
  var name = _ref.name,
    defaultValue = _ref.defaultValue,
    valueProp = _ref.value,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var formContext = (0, _react.useContext)(_FormContext.FormContext);
  var theme = (0, _useThemeValue.useThemeValue)();
  var _formContext$useFormI = formContext.useFormInput({
      name: name,
      value: valueProp,
      initialValue: defaultValue != null ? defaultValue : 0
    }),
    value = _formContext$useFormI[0],
    setValue = _formContext$useFormI[1];
  var options = [];
  for (var i = 1; i < 6; i += 1) {
    options.push(i);
  }
  return /*#__PURE__*/_react["default"].createElement(_RadioButtonGroup.RadioButtonGroup, _extends({
    name: name,
    direction: "row",
    options: options,
    onChange: function onChange(event) {
      setValue(event.value);
    }
  }, rest), function (option) {
    var _theme$starRating, _theme$starRating2;
    return option <= value ? /*#__PURE__*/_react["default"].createElement(_Star.Star, {
      color: (_theme$starRating = theme.starRating) == null ? void 0 : _theme$starRating.color
    }) : /*#__PURE__*/_react["default"].createElement(_StarOutline.StarOutline, {
      color: (_theme$starRating2 = theme.starRating) == null ? void 0 : _theme$starRating2.color
    });
  });
};
StarRating.displayName = 'StarRating';