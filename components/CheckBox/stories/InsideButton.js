"use strict";

exports.__esModule = true;
exports["default"] = exports.InsideButton = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var InsideButton = exports.InsideButton = function InsideButton() {
  var _useState = (0, _react.useState)(false),
    checked = _useState[0],
    setChecked = _useState[1];
  var onButtonClick = function onButtonClick() {
    return setChecked(!checked);
  };
  var onCheckboxChange = function onCheckboxChange() {};
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    hoverIndicator: "background",
    onClick: onButtonClick
  }, /*#__PURE__*/_react["default"].createElement(_grommet.CheckBox, {
    tabIndex: "-1",
    checked: checked,
    label: /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Hi"),
    onChange: onCheckboxChange
  })));
};
InsideButton.storyName = 'Inside a Button';
InsideButton.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = exports["default"] = {
  title: 'Input/CheckBox/Inside a Button'
};