"use strict";

exports.__esModule = true;
exports["default"] = exports.Busy = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var Busy = exports.Busy = function Busy() {
  var _useState = (0, _react.useState)(),
    busy = _useState[0],
    setBusy = _useState[1];
  var _useState2 = (0, _react.useState)(),
    success = _useState2[0],
    setSuccess = _useState2[1];
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    primary: true,
    busy: busy,
    success: success,
    label: "Button Busy",
    onClick: function onClick() {
      setBusy(true);
      setTimeout(function () {
        setBusy(false);
        setSuccess(true);
      }, 2000);
      setTimeout(function () {
        setSuccess(false);
      }, 4000);
    }
  }));
};
Busy.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = exports["default"] = {
  title: 'Controls/Button/Busy'
};