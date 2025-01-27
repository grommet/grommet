"use strict";

exports.__esModule = true;
exports.StarRating = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _Star = require("grommet-icons/icons/Star");
var _StarOutline = require("grommet-icons/icons/StarOutline");
var _Box = require("../Box");
var _FormContext = require("../Form/FormContext");
var _RadioButtonGroup = require("../RadioButtonGroup");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _utils = require("../../utils");
var _excluded = ["name", "defaultValue", "value"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var StyledStarRatingBox = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "StarRating__StyledStarRatingBox",
  componentId: "sc-34rgjv-0"
})(["", ";"], function (props) {
  return props.focus && (0, _utils.focusStyle)();
});
var StarRating = exports.StarRating = function StarRating(_ref) {
  var name = _ref.name,
    defaultValue = _ref.defaultValue,
    valueProp = _ref.value,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var formContext = (0, _react.useContext)(_FormContext.FormContext);
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme;
  var usingKeyboard = (0, _utils.useKeyboard)();
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
  }, rest), function (option, _ref2) {
    var _theme$starRating, _theme$starRating2;
    var focus = _ref2.focus;
    return /*#__PURE__*/_react["default"].createElement(StyledStarRatingBox, {
      focus: focus && usingKeyboard
    }, option <= value ? /*#__PURE__*/_react["default"].createElement(_Star.Star, {
      color: (_theme$starRating = theme.starRating) == null ? void 0 : _theme$starRating.color
    }) : /*#__PURE__*/_react["default"].createElement(_StarOutline.StarOutline, {
      color: (_theme$starRating2 = theme.starRating) == null ? void 0 : _theme$starRating2.color
    }));
  });
};
StarRating.displayName = 'StarRating';