"use strict";

exports.__esModule = true;
exports.WizardHeader = void 0;
var _react = _interopRequireDefault(require("react"));
var _Box = require("../Box");
var _Button = require("../Button");
var _Heading = require("../Heading");
var _MessageContext = require("../../contexts/MessageContext");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _WizardContext = require("./WizardContext");
var _excluded = ["title", "children"]; // SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
// Header above the progress track. Hosts the close (X) button which
// invokes `cancel` from context.
var WizardHeader = exports.WizardHeader = function WizardHeader(_ref) {
  var _theme$wizard, _headerTheme$title, _headerTheme$close;
  var title = _ref.title,
    children = _ref.children,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme;
  var _React$useContext = _react["default"].useContext(_MessageContext.MessageContext),
    format = _React$useContext.format;
  var _useWizard = (0, _WizardContext.useWizard)(),
    cancel = _useWizard.cancel,
    messages = _useWizard.messages;
  var headerTheme = (_theme$wizard = theme.wizard) == null ? void 0 : _theme$wizard.header;

  // Custom children override the themed title.
  var content = children !== undefined ? children : title && /*#__PURE__*/_react["default"].createElement(_Heading.Heading, {
    level: 1,
    size: headerTheme == null || (_headerTheme$title = headerTheme.title) == null ? void 0 : _headerTheme$title.size,
    margin: "none"
  }, title);
  var CloseIcon = headerTheme == null || (_headerTheme$close = headerTheme.close) == null ? void 0 : _headerTheme$close.icon;
  var closeLabel = format({
    id: 'wizard.close',
    messages: messages
  });
  return /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
    pad: headerTheme == null ? void 0 : headerTheme.pad,
    background: headerTheme == null ? void 0 : headerTheme.background,
    direction: "row",
    align: "center",
    justify: "between",
    flex: false
  }, rest), /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    direction: "row",
    align: "center",
    flex: true
  }, content), /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    "aria-label": closeLabel,
    icon: CloseIcon ? /*#__PURE__*/_react["default"].createElement(CloseIcon, {
      "aria-hidden": "true"
    }) : undefined,
    onClick: cancel
  }));
};
WizardHeader.displayName = 'WizardHeader';