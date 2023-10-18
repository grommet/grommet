"use strict";

exports.__esModule = true;
exports["default"] = exports.Announced = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
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