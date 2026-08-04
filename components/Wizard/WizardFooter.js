"use strict";

exports.__esModule = true;
exports.WizardFooter = void 0;
var _react = _interopRequireDefault(require("react"));
var _Box = require("../Box");
var _Button = require("../Button");
var _MessageContext = require("../../contexts/MessageContext");
var _ResponsiveContext = require("../../contexts/ResponsiveContext");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _WizardContext = require("./WizardContext");
var _excluded = ["children"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
// WizardFooter renders navigation buttons. Pass `children` to fully
// replace the default set.
var WizardFooter = exports.WizardFooter = function WizardFooter(_ref) {
  var _theme$wizard;
  var children = _ref.children,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme;
  var _React$useContext = _react["default"].useContext(_MessageContext.MessageContext),
    format = _React$useContext.format;
  var _useWizard = (0, _WizardContext.useWizard)(),
    currentStepObj = _useWizard.currentStepObj,
    currentStepIndex = _useWizard.currentStepIndex,
    totalSteps = _useWizard.totalSteps,
    canGoNext = _useWizard.canGoNext,
    next = _useWizard.next,
    previous = _useWizard.previous,
    skip = _useWizard.skip,
    complete = _useWizard.complete,
    cancel = _useWizard.cancel,
    hasCancelHandler = _useWizard.hasCancelHandler,
    messages = _useWizard.messages;
  if (!currentStepObj) return null;
  var isFirstStep = currentStepIndex <= 0;
  var isLastStep = currentStepIndex >= totalSteps - 1;
  var canGoPrevious = !isFirstStep;
  var footerTheme = (_theme$wizard = theme.wizard) == null ? void 0 : _theme$wizard.footer;

  // Only build the default buttons when `children` isn't provided; a
  // custom footer replaces them entirely.
  var content = children;
  if (content === undefined) {
    var _footerTheme$button, _footerTheme$button2, _footerTheme$button3, _footerTheme$button4, _footerTheme$button5;
    var label = function label(id) {
      return format({
        id: "wizard." + id,
        messages: messages
      });
    };
    var NextIcon = footerTheme == null || (_footerTheme$button = footerTheme.button) == null || (_footerTheme$button = _footerTheme$button.next) == null ? void 0 : _footerTheme$button.icon;
    var PreviousIcon = footerTheme == null || (_footerTheme$button2 = footerTheme.button) == null || (_footerTheme$button2 = _footerTheme$button2.previous) == null ? void 0 : _footerTheme$button2.icon;
    var SkipIcon = footerTheme == null || (_footerTheme$button3 = footerTheme.button) == null || (_footerTheme$button3 = _footerTheme$button3.skip) == null ? void 0 : _footerTheme$button3.icon;
    var CompleteIcon = footerTheme == null || (_footerTheme$button4 = footerTheme.button) == null || (_footerTheme$button4 = _footerTheme$button4.complete) == null ? void 0 : _footerTheme$button4.icon;
    var CancelIcon = footerTheme == null || (_footerTheme$button5 = footerTheme.button) == null || (_footerTheme$button5 = _footerTheme$button5.cancel) == null ? void 0 : _footerTheme$button5.icon;
    content = [hasCancelHandler && /*#__PURE__*/_react["default"].createElement(_Button.Button, {
      key: "cancel",
      label: label('cancel'),
      icon: CancelIcon ? /*#__PURE__*/_react["default"].createElement(CancelIcon, {
        "aria-hidden": "true"
      }) : undefined,
      onClick: cancel
    }), !isFirstStep && /*#__PURE__*/_react["default"].createElement(_Button.Button, {
      key: "previous",
      label: label('previous'),
      secondary: true,
      icon: PreviousIcon ? /*#__PURE__*/_react["default"].createElement(PreviousIcon, {
        "aria-hidden": "true"
      }) : undefined,
      disabled: !canGoPrevious,
      onClick: previous
    }), currentStepObj.skippable && !isLastStep && /*#__PURE__*/_react["default"].createElement(_Button.Button, {
      key: "skip",
      label: label('skip'),
      secondary: true,
      icon: SkipIcon ? /*#__PURE__*/_react["default"].createElement(SkipIcon, {
        "aria-hidden": "true"
      }) : undefined,
      reverse: true,
      onClick: skip
    }), isLastStep ? /*#__PURE__*/_react["default"].createElement(_Button.Button, {
      key: "complete",
      label: label('complete'),
      icon: CompleteIcon ? /*#__PURE__*/_react["default"].createElement(CompleteIcon, {
        "aria-hidden": "true"
      }) : undefined,
      primary: true,
      disabled: !canGoNext,
      onClick: complete
    }) : /*#__PURE__*/_react["default"].createElement(_Button.Button, {
      key: "next",
      label: label('next'),
      primary: true,
      icon: NextIcon ? /*#__PURE__*/_react["default"].createElement(NextIcon, {
        "aria-hidden": "true"
      }) : undefined,
      reverse: true,
      disabled: !canGoNext,
      onClick: next
    })];
  }
  return /*#__PURE__*/_react["default"].createElement(_ResponsiveContext.ResponsiveContext.Consumer, null, function (size) {
    var isSmall = size === 'small';
    return /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
      background: footerTheme == null ? void 0 : footerTheme.background,
      border: footerTheme == null ? void 0 : footerTheme.border,
      pad: footerTheme == null ? void 0 : footerTheme.pad,
      gap: footerTheme == null ? void 0 : footerTheme.gap,
      direction: "row",
      justify: footerTheme == null ? void 0 : footerTheme.justify,
      align: "center",
      wrap: isSmall,
      flex: false
    }, rest), content);
  });
};
WizardFooter.displayName = 'WizardFooter';