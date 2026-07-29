"use strict";

exports.__esModule = true;
exports.WizardContent = void 0;
var _react = _interopRequireDefault(require("react"));
var _Box = require("../Box");
var _Text = require("../Text");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _WizardContext = require("./WizardContext");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// WizardContent renders the current step body and any wizard-level
// validation error message.
var WizardContent = exports.WizardContent = function WizardContent(_ref) {
  var _theme$wizard, _theme$wizard2;
  var rest = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme;
  var _useWizard = (0, _WizardContext.useWizard)(),
    currentStepObj = _useWizard.currentStepObj,
    formValue = _useWizard.formValue,
    setFormValue = _useWizard.setFormValue,
    next = _useWizard.next,
    previous = _useWizard.previous,
    goTo = _useWizard.goTo,
    skip = _useWizard.skip,
    complete = _useWizard.complete,
    cancel = _useWizard.cancel,
    validationError = _useWizard.validationError,
    renderStep = _useWizard.renderStep;
  var contentTheme = (_theme$wizard = theme.wizard) == null ? void 0 : _theme$wizard.content;
  var helperTheme = (_theme$wizard2 = theme.wizard) == null || (_theme$wizard2 = _theme$wizard2.error) == null ? void 0 : _theme$wizard2.helperText;
  if (!currentStepObj) return null;

  // API exposed to renderStep callbacks.
  var wizardApi = {
    formValue: formValue,
    setFormValue: setFormValue,
    next: next,
    previous: previous,
    goTo: goTo,
    skip: skip,
    complete: complete,
    cancel: cancel
  };
  var stepRender = renderStep || currentStepObj.render;
  var body = stepRender ? stepRender(currentStepObj, wizardApi) : null;
  return /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
    pad: contentTheme == null ? void 0 : contentTheme.pad,
    background: contentTheme == null ? void 0 : contentTheme.background,
    round: contentTheme == null ? void 0 : contentTheme.round,
    margin: contentTheme == null ? void 0 : contentTheme.margin
    // Grow to fill the middle region without shrinking. The scroll
    // region lives on the middle (StyledWizardMiddle), not here.
    ,
    flex: "grow"
  }, rest), body, validationError && /*#__PURE__*/_react["default"].createElement(_Text.Text, _extends({
    role: "alert",
    "aria-live": "polite"
  }, helperTheme), validationError));
};
WizardContent.displayName = 'WizardContent';