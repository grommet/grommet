"use strict";

exports.__esModule = true;
exports.WizardContent = void 0;
var _react = _interopRequireDefault(require("react"));
var _Box = require("../Box");
var _Notification = require("../Notification");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _WizardContext = require("./WizardContext");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } // SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
// WizardContent renders the current step body and any wizard-level
// validation error message.
var WizardContent = exports.WizardContent = function WizardContent(_ref) {
  var _theme$wizard;
  var rest = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme;
  var wizard = (0, _WizardContext.useWizard)();
  var currentStepObj = wizard.currentStepObj,
    renderStep = wizard.renderStep,
    validationError = wizard.validationError;
  var contentTheme = (_theme$wizard = theme.wizard) == null ? void 0 : _theme$wizard.content;
  if (!currentStepObj) return null;
  var stepRender = currentStepObj.render || renderStep;
  var body = stepRender ? stepRender(currentStepObj, wizard) : null;
  return /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({}, contentTheme, {
    flex: "grow"
  }, rest), body, validationError && /*#__PURE__*/_react["default"].createElement(_Notification.Notification, {
    status: "critical",
    message: validationError
  }));
};
WizardContent.displayName = 'WizardContent';