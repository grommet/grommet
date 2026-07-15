"use strict";

exports.__esModule = true;
exports["default"] = exports.Children = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _grommetIcons = require("grommet-icons");
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _utils = require("grommet/utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var StyledRadioChild = (0, _styledComponents["default"])(_grommet.Box).withConfig({
  displayName: "Childrenstories__StyledRadioChild",
  componentId: "sc-9gh2ar-0"
})(["", ""], function (props) {
  return props.focus && props.keyboard && (0, _utils.focusStyle)();
});
var Children = exports.Children = function Children() {
  var _useState = (0, _react.useState)(),
    value = _useState[0],
    setValue = _useState[1];
  var usingKeyboard = (0, _utils.useKeyboard)();
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.RadioButtonGroup, {
    name: "radio",
    direction: "row",
    gap: "xsmall",
    options: ['asc', 'desc'],
    value: value,
    onChange: function onChange(event) {
      return setValue(event.target.value);
    }
  }, function (option, _ref) {
    var checked = _ref.checked,
      focus = _ref.focus,
      hover = _ref.hover;
    var Icon = option === 'asc' ? _grommetIcons.Ascend : _grommetIcons.Descend;
    var background;
    if (checked) background = 'brand';else if (hover) background = 'light-4';else if (focus) background = 'light-4';else background = 'light-2';
    return /*#__PURE__*/_react["default"].createElement(StyledRadioChild, {
      focus: focus,
      keyboard: usingKeyboard,
      background: background,
      pad: "xsmall"
    }, /*#__PURE__*/_react["default"].createElement(Icon, null));
  }));
};
var _default = exports["default"] = {
  title: 'Input/RadioButtonGroup/Children'
};