"use strict";

exports.__esModule = true;
exports["default"] = exports.Circle = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var Circle = exports.Circle = function Circle() {
  var _useState = (0, _react.useState)(20),
    value = _useState[0],
    setValue = _useState[1];
  (0, _react.useEffect)(function () {
    var interval = setInterval(function () {
      setValue(value < 60 ? value + 8 : 20);
    }, 2000);
    return function () {
      return clearInterval(interval);
    };
  }, [value]);
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
        color: value > 50 ? 'status-critical' : 'status-ok'
      }]
    }))
    // </Grommet>
  );
};
var _default = exports["default"] = {
  title: 'Visualizations/Meter/Circle'
};