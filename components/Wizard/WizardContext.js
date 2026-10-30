"use strict";

exports.__esModule = true;
exports.useWizard = exports.WizardContext = void 0;
var _react = _interopRequireWildcard(require("react"));
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

// WizardContext exposes wizard state and navigation actions to descendants.
var WizardContext = exports.WizardContext = /*#__PURE__*/_react["default"].createContext({
  steps: [],
  clickableSteps: false,
  closable: true,
  currentStep: '',
  currentStepIndex: 0,
  currentStepObj: undefined,
  totalSteps: 0,
  stepStates: {},
  form: true,
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