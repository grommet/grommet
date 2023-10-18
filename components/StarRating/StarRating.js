"use strict";

exports.__esModule = true;
exports.StarRating = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = require("styled-components");
var _Star = require("grommet-icons/icons/Star");
var _StarOutline = require("grommet-icons/icons/StarOutline");
var _RadioButtonGroup = require("../RadioButtonGroup");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure " + obj); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var StarRating = exports.StarRating = function StarRating(_ref) {
  var rest = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  var theme = (0, _react.useContext)(_styledComponents.ThemeContext);
  var _useState = (0, _react.useState)(),
    value = _useState[0],
    setValue = _useState[1];
  var options = [];
  for (var i = 1; i < 6; i += 1) {
    options.push(i);
  }
  return /*#__PURE__*/_react["default"].createElement(_RadioButtonGroup.RadioButtonGroup, _extends({
    direction: "row",
    options: options,
    onChange: function onChange(event) {
      setValue(event.target.value);
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