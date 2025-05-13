"use strict";

exports.__esModule = true;
exports["default"] = exports.NonResizable = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var Resize = function Resize(props) {
  var _useState = (0, _react.useState)(''),
    value = _useState[0],
    setValue = _useState[1];
  var onChange = function onChange(event) {
    return setValue(event.target.value);
  };
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.TextArea, _extends({
      "aria-label": "text area",
      value: value,
      onChange: onChange
    }, props)))
    // </Grommet>
  );
};
var NonResizable = exports.NonResizable = function NonResizable() {
  return /*#__PURE__*/_react["default"].createElement(Resize, {
    resize: false
  });
};
NonResizable.storyName = 'Non resizable';
var _default = exports["default"] = {
  title: 'Input/TextArea/Non resizable'
};