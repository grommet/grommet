"use strict";

exports.__esModule = true;
exports.useWizard = exports.WizardContext = void 0;
var _react = _interopRequireWildcard(require("react"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
// WizardContext exposes wizard state and navigation actions to descendants.
var WizardContext = exports.WizardContext = /*#__PURE__*/_react["default"].createContext({
  steps: [],
  currentStep: '',
  currentStepIndex: 0,
  currentStepObj: undefined,
  totalSteps: 0,
  stepStates: {},
  formValue: {},
  setFormValue: function setFormValue() {},
  validationError: undefined,
  isValidating: false,
  isBlocked: false,
  isCompleted: false,
  canGoNext: true,
  next: function next() {},
  previous: function previous() {},
  goTo: function goTo() {},
  skip: function skip() {},
  complete: function complete() {},
  cancel: function cancel() {},
  // True when `onCancel` was provided; drives the footer Cancel button.
  hasCancelHandler: false,
  showProgress: false,
  renderStep: undefined
});
var useWizard = exports.useWizard = function useWizard() {
  return (0, _react.useContext)(WizardContext);
};