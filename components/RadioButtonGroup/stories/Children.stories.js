"use strict";

exports.__esModule = true;
exports["default"] = exports.Children = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _grommetIcons = require("grommet-icons");
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _utils = require("grommet/utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

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