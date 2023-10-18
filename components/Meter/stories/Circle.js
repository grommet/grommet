"use strict";

exports.__esModule = true;
exports["default"] = exports.Circle = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var Circle = exports.Circle = function Circle() {
  var _useState = (0, _react.useState)(20),
    value = _useState[0],
    setValue = _useState[1];
  var timer = (0, _react.useRef)();
  clearTimeout(timer.current);
  timer.current = setTimeout(function () {
    setValue(value < 100 ? value + 8 : 20);
  }, 2000);
  (0, _react.useEffect)(function () {
    return function () {
      clearTimeout(timer.current);
    };
  }, []);
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    _react["default"].createElement(_grommet.Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Meter, {
      type: "circle",
      background: "light-2",
      values: [{
        value: value,
        color: value > 50 ? 'accent-2' : 'accent-1'
      }]
    }))
    // </Grommet>
  );
};
var _default = exports["default"] = {
  title: 'Visualizations/Meter/Circle'
};