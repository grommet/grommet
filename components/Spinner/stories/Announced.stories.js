"use strict";

exports.__esModule = true;
exports["default"] = exports.Announced = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var PageContent = function PageContent() {
  // 'show=true' will trigger the announcement
  var _useState = (0, _react.useState)(false),
    show = _useState[0],
    setShow = _useState[1];
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, {
    textAlign: "center"
  }, "Spinner has a built in Screen Reader functionality to assist screen readers. An announcement of the given message prop will be announced to screen readers after the spinner component renders."), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "Load",
    onClick: function onClick() {
      setShow(true);
      setTimeout(function () {
        setShow(false);
      }, 1500);
    }
  }), show && /*#__PURE__*/_react["default"].createElement(_grommet.Spinner, {
    message: "Start Built-in Spinner Announcement"
  }));
};
var Announced = exports.Announced = function Announced() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(PageContent, null));
};
Announced.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = exports["default"] = {
  title: 'Visualizations/Spinner/Announced'
};