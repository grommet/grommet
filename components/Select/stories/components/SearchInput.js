"use strict";

exports.__esModule = true;
exports.SearchInput = void 0;
var _react = _interopRequireWildcard(require("react"));
var _ = require("../../..");
var _SearchBorderBox = require("./SearchBorderBox");
var _excluded = ["searching"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
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