"use strict";

exports.__esModule = true;
exports["default"] = exports.ExternalForm = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _Wizard = require("../Wizard");
var _WizardFooter = require("../WizardFooter");
var _WizardContext = require("../WizardContext");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } // SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
var validate = function validate(value) {
  var _value$name;
  return {
    details: (_value$name = value.name) != null && _value$name.trim() ? undefined : 'A request name is required.'
  };
};
var ExternalFormFooter = function ExternalFormFooter(_ref) {
  var errors = _ref.errors;
  var _useWizard = (0, _WizardContext.useWizard)(),
    complete = _useWizard.complete,
    currentStep = _useWizard.currentStep,
    currentStepIndex = _useWizard.currentStepIndex,
    next = _useWizard.next,
    previous = _useWizard.previous,
    totalSteps = _useWizard.totalSteps;
  var isFirstStep = currentStepIndex === 0;
  var isLastStep = currentStepIndex === totalSteps - 1;
  var hasError = !!errors[currentStep];
  return /*#__PURE__*/_react["default"].createElement(_WizardFooter.WizardFooter, null, !isFirstStep && /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "Previous",
    secondary: true,
    onClick: previous
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: isLastStep ? 'Complete' : 'Next',
    primary: true,
    disabled: hasError,
    onClick: isLastStep ? complete : next
  }));
};
var ExternalForm = exports.ExternalForm = function ExternalForm() {
  var _useState = (0, _react.useState)(),
    submittedValue = _useState[0],
    setSubmittedValue = _useState[1];
  var _useState2 = (0, _react.useState)({
      name: ''
    }),
    value = _useState2[0],
    setValue = _useState2[1];
  var errors = validate(value);
  var steps = [{
    id: 'details',
    title: 'Details',
    status: errors.details ? 'error' : 'completed',
    errorMessage: errors.details,
    render: function render() {
      return /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
        htmlFor: "request-name",
        label: "Request name",
        name: "name",
        error: errors.details
      }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
        id: "request-name",
        name: "name",
        value: value.name,
        onChange: function onChange(event) {
          return setValue(function (currentValue) {
            return _extends({}, currentValue, {
              name: event.target.value
            });
          });
        }
      }));
    }
  }, {
    id: 'review',
    title: 'Review',
    render: function render() {
      return /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "Review the request for ", value.name || 'an unnamed request', ".");
    }
  }];
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true
  }, /*#__PURE__*/_react["default"].createElement(_Wizard.Wizard, {
    "aria-label": "New request",
    form: false,
    title: "New request",
    showProgress: "vertical",
    steps: steps,
    footer: /*#__PURE__*/_react["default"].createElement(ExternalFormFooter, {
      errors: errors
    }),
    onComplete: function onComplete() {
      return setSubmittedValue(value);
    }
  }), submittedValue && /*#__PURE__*/_react["default"].createElement(_grommet.Notification, {
    toast: {
      position: 'top'
    },
    status: "normal",
    title: "Request submitted",
    message: "Created request " + submittedValue.name + ".",
    onClose: function onClose() {
      return setSubmittedValue(undefined);
    }
  }));
};
ExternalForm.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Layout/Wizard/External Form'
};