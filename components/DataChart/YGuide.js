"use strict";

exports.__esModule = true;
exports.YGuide = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Box = require("../Box");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
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