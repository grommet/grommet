"use strict";

exports.__esModule = true;
exports.FocusedContainer = void 0;
var _react = _interopRequireWildcard(require("react"));
var _utils = require("../utils");
var _RootsContext = require("../contexts/RootsContext");
var _excluded = ["hidden", "restrictScroll", "children", "trapFocus"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.indexOf(n) >= 0) continue; t[n] = r[n]; } return t; }
var FocusedContainer = exports.FocusedContainer = function FocusedContainer(_ref) {
  var _ref$hidden = _ref.hidden,
    hidden = _ref$hidden === void 0 ? false : _ref$hidden,
    _ref$restrictScroll = _ref.restrictScroll,
    restrictScroll = _ref$restrictScroll === void 0 ? false : _ref$restrictScroll,
    children = _ref.children,
    trapFocus = _ref.trapFocus,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useState = (0, _react.useState)(''),
    bodyOverflowStyle = _useState[0],
    setBodyOverflowStyle = _useState[1];
  var ref = (0, _react.useRef)(null);
  var roots = (0, _react.useContext)(_RootsContext.RootsContext);
  var _useState2 = (0, _react.useState)(roots),
    nextRoots = _useState2[0],
    setNextRoots = _useState2[1];
  (0, _react.useEffect)(function () {
    // make sure value of null is not added to array
    if (ref.current) setNextRoots([].concat(roots, [ref.current]));
  }, [roots]);
  (0, _react.useEffect)(function () {
    if (bodyOverflowStyle !== 'hidden' && !hidden && restrictScroll && trapFocus) {
      setBodyOverflowStyle(document.body.style.overflow);
      document.body.style.overflow = 'hidden';
    }
    return function () {
      if (bodyOverflowStyle !== 'hidden' && !hidden && restrictScroll && trapFocus) {
        document.body.style.overflow = bodyOverflowStyle;
      }
    };
  }, [bodyOverflowStyle, hidden, trapFocus, restrictScroll]);
  (0, _react.useEffect)(function () {
    var timer = setTimeout(function () {
      if (!hidden && trapFocus && roots && roots[0]) {
        roots.forEach(_utils.makeNodeUnfocusable);
      }
    }, 0);
    return function () {
      // remove trap and restore ability to focus on the last root only
      if (roots && roots[0]) (0, _utils.makeNodeFocusable)(roots[roots.length - 1]);
      clearTimeout(timer);
    };
  }, [hidden, roots, trapFocus]);
  return /*#__PURE__*/_react["default"].createElement(_RootsContext.RootsContext.Provider, {
    value: nextRoots
  }, /*#__PURE__*/_react["default"].createElement("div", _extends({
    ref: ref,
    "aria-hidden": hidden
  }, rest), children));
};