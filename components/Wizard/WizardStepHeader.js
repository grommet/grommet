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
var _StyledWizard = require("./StyledWizard");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Renders the "Step X of Y" counter, title, and description. Wrapped in an
// `aria-live="polite"` focus anchor (located via `data-g-wizard-focus-anchor`)
// so Wizard can move focus here on step transitions for screen readers.
var WizardStepHeader = exports.WizardStepHeader = function WizardStepHeader(_ref) {
  var _theme$wizard, _theme$wizard2;
  var rest = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme;
  var _React$useContext = _react["default"].useContext(_MessageContext.MessageContext),
    format = _React$useContext.format;
  var _useWizard = (0, _WizardContext.useWizard)(),
    currentStepObj = _useWizard.currentStepObj,
    currentStepIndex = _useWizard.currentStepIndex,
    totalSteps = _useWizard.totalSteps,
    messages = _useWizard.messages;
  if (!currentStepObj) return null;
  var stepHeaderTheme = (_theme$wizard = theme.wizard) == null ? void 0 : _theme$wizard.stepHeader;
  var counterTheme = (_theme$wizard2 = theme.wizard) == null || (_theme$wizard2 = _theme$wizard2.stepHeader) == null ? void 0 : _theme$wizard2.counter;
  var counterTemplate = format({
    id: 'wizard.stepHeader.counter',
    values: {
      step: currentStepIndex + 1,
      total: totalSteps
    },
    messages: messages
  });
  return /*#__PURE__*/_react["default"].createElement(_StyledWizard.StyledWizardFocusAnchor, {
    "data-g-wizard-focus-anchor": true,
    tabIndex: -1,
    "aria-live": "polite"
  }, /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
    pad: stepHeaderTheme == null ? void 0 : stepHeaderTheme.pad,
    gap: stepHeaderTheme == null ? void 0 : stepHeaderTheme.gap,
    flex: false
  }, rest), /*#__PURE__*/_react["default"].createElement(_Text.Text, counterTheme, counterTemplate), /*#__PURE__*/_react["default"].createElement(_Heading.Heading, _extends({
    level: 2
  }, stepHeaderTheme == null ? void 0 : stepHeaderTheme.title), currentStepObj.title), currentStepObj.description && /*#__PURE__*/_react["default"].createElement(_Paragraph.Paragraph, stepHeaderTheme == null ? void 0 : stepHeaderTheme.description, currentStepObj.description)));
};
WizardStepHeader.displayName = 'WizardStepHeader';