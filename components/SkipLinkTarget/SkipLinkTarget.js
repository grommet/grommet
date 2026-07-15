"use strict";

exports.__esModule = true;
exports.SkipLinkTarget = void 0;
var _react = _interopRequireDefault(require("react"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _Anchor = require("../Anchor");
var _excluded = ["label"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var HiddenAnchor = (0, _styledComponents["default"])(_Anchor.Anchor).withConfig({
  displayName: "SkipLinkTarget__HiddenAnchor",
  componentId: "sc-16wjfgk-0"
})(["width:0;height:0;overflow:hidden;position:absolute;"]);
var SkipLinkTarget = exports.SkipLinkTarget = function SkipLinkTarget(_ref) {
  var label = _ref.label,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  return /*#__PURE__*/_react["default"].createElement(HiddenAnchor, _extends({}, rest, {
    tabIndex: "-1",
    "aria-hidden": "true"
  }), label);
};