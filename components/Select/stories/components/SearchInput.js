"use strict";

exports.__esModule = true;
exports.SearchInput = void 0;
var _react = _interopRequireWildcard(require("react"));
var _ = require("../../..");
var _SearchBorderBox = require("./SearchBorderBox");
var _excluded = ["searching"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
/* Need ForwardRef since this functional component
   is being passed into a custom theme for SearchInput
*/
var SearchInput = exports.SearchInput = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, textInputRef) {
  var searching = _ref.searching,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
  (0, _react.useEffect)(function () {
    var focusTimeout = setTimeout(function () {
      textInputRef.current.focus();
    }, 300);
    return function () {
      clearTimeout(focusTimeout);
    };
  }, [textInputRef]);
  return /*#__PURE__*/_react["default"].createElement(_SearchBorderBox.SearchBorderBox, {
    searching: searching
  }, /*#__PURE__*/_react["default"].createElement(_.TextInput, _extends({}, props, {
    plain: true,
    ref: textInputRef
  })));
});