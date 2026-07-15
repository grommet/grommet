"use strict";

exports.__esModule = true;
exports.WizardStepHeader = void 0;
var _react = _interopRequireDefault(require("react"));
var _Box = require("../Box");
var _Heading = require("../Heading");
var _Paragraph = require("../Paragraph");
var _Text = require("../Text");
var _MessageContext = require("../../contexts/MessageContext");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _WizardContext = require("./WizardContext");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// WizardStepHeader renders the "Step X of Y" counter, the step title, and
// the step description. All typography goes through Text / Heading /
// Paragraph with theme-driven props (no custom font-size CSS).
//
// Sub-component follows the composition-primitive pattern: theme values
// drive default props on the primitives, and callers can override any
// outer Box prop by passing it directly (spread as {...rest} last).
var WizardStepHeader = exports.WizardStepHeader = function WizardStepHeader(_ref) {
  var _theme$wizard, _theme$wizard2, _stepHeaderTheme$titl, _stepHeaderTheme$titl2, _stepHeaderTheme$titl3, _stepHeaderTheme$titl4, _stepHeaderTheme$titl5, _stepHeaderTheme$desc, _stepHeaderTheme$desc2, _stepHeaderTheme$desc3, _stepHeaderTheme$desc4;
  var rest = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;
  var _React$useContext = _react["default"].useContext(_MessageContext.MessageContext),
    format = _React$useContext.format;
  var _useWizard = (0, _WizardContext.useWizard)(),
    currentStepObj = _useWizard.currentStepObj,
    currentStepIndex = _useWizard.currentStepIndex,
    totalSteps = _useWizard.totalSteps,
    messages = _useWizard.messages;
  if (!currentStepObj) return null;
  var stepHeaderTheme = (_theme$wizard = theme.wizard) == null ? void 0 : _theme$wizard.stepHeader;
  var counterTheme = (_theme$wizard2 = theme.wizard) == null ? void 0 : _theme$wizard2.stepCounter;
  var counterTemplate = (messages == null ? void 0 : messages.stepCounter) || format({
    id: 'wizard.stepCounter',
    values: {
      step: currentStepIndex + 1,
      total: totalSteps
    }
  });
  return /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
    pad: stepHeaderTheme == null ? void 0 : stepHeaderTheme.pad,
    gap: stepHeaderTheme == null ? void 0 : stepHeaderTheme.gap,
    flex: false
  }, passThemeFlag, rest), /*#__PURE__*/_react["default"].createElement(_Text.Text, {
    size: counterTheme == null ? void 0 : counterTheme.size,
    color: counterTheme == null ? void 0 : counterTheme.color,
    weight: counterTheme == null ? void 0 : counterTheme.weight,
    margin: counterTheme == null ? void 0 : counterTheme.margin
  }, counterTemplate), /*#__PURE__*/_react["default"].createElement(_Heading.Heading, {
    level: stepHeaderTheme == null || (_stepHeaderTheme$titl = stepHeaderTheme.title) == null ? void 0 : _stepHeaderTheme$titl.level,
    size: stepHeaderTheme == null || (_stepHeaderTheme$titl2 = stepHeaderTheme.title) == null ? void 0 : _stepHeaderTheme$titl2.size,
    color: stepHeaderTheme == null || (_stepHeaderTheme$titl3 = stepHeaderTheme.title) == null ? void 0 : _stepHeaderTheme$titl3.color,
    weight: stepHeaderTheme == null || (_stepHeaderTheme$titl4 = stepHeaderTheme.title) == null ? void 0 : _stepHeaderTheme$titl4.weight,
    margin: (stepHeaderTheme == null || (_stepHeaderTheme$titl5 = stepHeaderTheme.title) == null ? void 0 : _stepHeaderTheme$titl5.margin) || 'none'
  }, currentStepObj.title), currentStepObj.description && /*#__PURE__*/_react["default"].createElement(_Paragraph.Paragraph, {
    size: stepHeaderTheme == null || (_stepHeaderTheme$desc = stepHeaderTheme.description) == null ? void 0 : _stepHeaderTheme$desc.size,
    color: stepHeaderTheme == null || (_stepHeaderTheme$desc2 = stepHeaderTheme.description) == null ? void 0 : _stepHeaderTheme$desc2.color,
    weight: stepHeaderTheme == null || (_stepHeaderTheme$desc3 = stepHeaderTheme.description) == null ? void 0 : _stepHeaderTheme$desc3.weight,
    margin: stepHeaderTheme == null || (_stepHeaderTheme$desc4 = stepHeaderTheme.description) == null ? void 0 : _stepHeaderTheme$desc4.margin,
    fill: true
  }, currentStepObj.description));
};
WizardStepHeader.displayName = 'WizardStepHeader';