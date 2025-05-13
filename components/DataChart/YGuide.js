"use strict";

exports.__esModule = true;
exports.YGuide = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Box = require("../Box");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var YGuide = exports.YGuide = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var guide = _ref.guide,
    padArg = _ref.pad,
    thickness = _ref.thickness;
  var pad = padArg;
  if (thickness) {
    // omit any horizontal pad so the guides cover the thickness that
    // is within the pad
    if (typeof padArg === 'object') pad = _extends({}, padArg, {
      start: 'none',
      end: 'none'
    });else if (typeof padArg === 'string') pad = {
      vertical: padArg
    };
  }
  return /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    ref: ref,
    fill: true,
    justify: "between",
    pad: pad,
    responsive: false
  }, Array.from({
    length: guide.y.count
  }).map(function (_, i) {
    return (
      /*#__PURE__*/
      // eslint-disable-next-line react/no-array-index-key
      _react["default"].createElement(_Box.Box, {
        key: i,
        border: "top"
      })
    );
  }));
});