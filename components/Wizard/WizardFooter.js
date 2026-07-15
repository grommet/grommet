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
// WizardFooter renders navigation buttons. Labels come from MessageContext
// (with optional message override). Primary action changes on the last step
// (Complete) vs intermediate steps (Next). Icons come from theme.wizard.icons.
// Passing `children` fully replaces the default button set; callers use
// `useWizard()` for navigation callbacks while keeping the themed shell.
var WizardFooter = exports.WizardFooter = function WizardFooter(_ref) {
  var _theme$wizard, _theme$wizard2, _footerTheme$button, _footerTheme$button2, _footerTheme$button3, _footerTheme$button4;
  var children = _ref.children,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;
  var _React$useContext = _react["default"].useContext(_MessageContext.MessageContext),
    format = _React$useContext.format;
  var _useWizard = (0, _WizardContext.useWizard)(),
    currentStepObj = _useWizard.currentStepObj,
    isFirstStep = _useWizard.isFirstStep,
    isLastStep = _useWizard.isLastStep,
    canGoNext = _useWizard.canGoNext,
    canGoPrevious = _useWizard.canGoPrevious,
    next = _useWizard.next,
    previous = _useWizard.previous,
    skip = _useWizard.skip,
    complete = _useWizard.complete,
    cancel = _useWizard.cancel,
    hasCancelHandler = _useWizard.hasCancelHandler,
    messages = _useWizard.messages;
  if (!currentStepObj) return null;
  var footerTheme = (_theme$wizard = theme.wizard) == null ? void 0 : _theme$wizard.footer;
  var iconTheme = (_theme$wizard2 = theme.wizard) == null ? void 0 : _theme$wizard2.icons;
  var label = function label(id, override) {
    return override || format({
      id: "wizard." + id
    });
  };
  var NextIcon = iconTheme == null ? void 0 : iconTheme.next;
  var PreviousIcon = iconTheme == null ? void 0 : iconTheme.previous;
  var CompleteIcon = iconTheme == null ? void 0 : iconTheme.complete;
  var CancelIcon = iconTheme == null ? void 0 : iconTheme.cancel;
  var SkipIcon = iconTheme == null ? void 0 : iconTheme.skip;

  // Array (not Fragment) so Box gap injection sees each button as a
  // separate child. Cancel is rendered only when `onCancel` was provided;
  // otherwise the header X button is the sole cancel affordance.
  var defaultButtons = [hasCancelHandler && /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    key: "cancel",
    label: label('cancel', messages == null ? void 0 : messages.cancel),
    kind: footerTheme == null || (_footerTheme$button = footerTheme.button) == null || (_footerTheme$button = _footerTheme$button.cancel) == null ? void 0 : _footerTheme$button.kind,
    plain: footerTheme == null || (_footerTheme$button2 = footerTheme.button) == null || (_footerTheme$button2 = _footerTheme$button2.cancel) == null ? void 0 : _footerTheme$button2.plain,
    icon: CancelIcon ? /*#__PURE__*/_react["default"].createElement(CancelIcon, {
      "aria-hidden": "true"
    }) : undefined,
    onClick: cancel
  }), !isFirstStep && /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    key: "previous",
    label: label('previous', messages == null ? void 0 : messages.previous),
    kind: footerTheme == null || (_footerTheme$button3 = footerTheme.button) == null || (_footerTheme$button3 = _footerTheme$button3.previous) == null ? void 0 : _footerTheme$button3.kind,
    icon: PreviousIcon ? /*#__PURE__*/_react["default"].createElement(PreviousIcon, {
      "aria-hidden": "true"
    }) : undefined,
    disabled: !canGoPrevious,
    onClick: previous
  }), currentStepObj.skippable && !isLastStep && /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    key: "skip",
    label: label('skip', messages == null ? void 0 : messages.skip),
    kind: footerTheme == null || (_footerTheme$button4 = footerTheme.button) == null || (_footerTheme$button4 = _footerTheme$button4.skip) == null ? void 0 : _footerTheme$button4.kind,
    icon: SkipIcon ? /*#__PURE__*/_react["default"].createElement(SkipIcon, {
      "aria-hidden": "true"
    }) : undefined,
    reverse: true,
    onClick: skip
  }), isLastStep ? /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    key: "complete",
    label: label('complete', messages == null ? void 0 : messages.complete),
    primary: true,
    icon: CompleteIcon ? /*#__PURE__*/_react["default"].createElement(CompleteIcon, {
      "aria-hidden": "true"
    }) : undefined,
    disabled: !canGoNext,
    onClick: complete
  }) : /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    key: "next",
    label: label('next', messages == null ? void 0 : messages.next),
    primary: true,
    icon: NextIcon ? /*#__PURE__*/_react["default"].createElement(NextIcon, {
      "aria-hidden": "true"
    }) : undefined,
    reverse: true,
    disabled: !canGoNext,
    onClick: next
  })];
  return /*#__PURE__*/_react["default"].createElement(_ResponsiveContext.ResponsiveContext.Consumer, null, function (size) {
    var _theme$global;
    var isSmall = size === 'small';
    var gapSize = footerTheme == null ? void 0 : footerTheme.gap;
    var rowGap = isSmall ? ((_theme$global = theme.global) == null || (_theme$global = _theme$global.edgeSize) == null ? void 0 : _theme$global[gapSize]) || gapSize : undefined;
    return /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
      background: footerTheme == null ? void 0 : footerTheme.background,
      border: footerTheme == null ? void 0 : footerTheme.border,
      pad: isSmall ? {
        horizontal: 'small',
        vertical: 'small'
      } : footerTheme == null ? void 0 : footerTheme.pad,
      gap: gapSize,
      height: isSmall ? undefined : footerTheme == null ? void 0 : footerTheme.height,
      direction: "row",
      justify: footerTheme == null ? void 0 : footerTheme.justify,
      align: "center",
      wrap: isSmall,
      flex: false,
      style: rowGap ? {
        rowGap: rowGap
      } : undefined
    }, passThemeFlag, rest), children != null ? children : defaultButtons);
  });
};
WizardFooter.displayName = 'WizardFooter';