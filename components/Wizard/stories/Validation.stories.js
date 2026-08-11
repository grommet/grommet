"use strict";

exports.__esModule = true;
exports["default"] = exports.Validation = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _Wizard = require("../Wizard");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var validateEmail = function validateEmail(email) {
  if (!email) return 'Email is required.';
  if (!email.includes('@')) return 'Enter a valid email address.';
  return undefined;
};
var validatePassword = function validatePassword(password) {
  if (!password || password.length < 6) {
    return 'Password must be at least 6 characters.';
  }
  return undefined;
};
var Validation = exports.Validation = function Validation() {
  var _useState = (0, _react.useState)(null),
    result = _useState[0],
    setResult = _useState[1];
  var steps = [{
    id: 'email',
    title: 'Email',
    description: 'Enter a valid email address.',
    skippable: true,
    validate: function validate(value) {
      return validateEmail(value.email) ? 'Fix the issues to continue' : true;
    },
    render: function render(step, api) {
      var emailError = api.validationError && validateEmail(api.formValue.email);
      return /*#__PURE__*/_react["default"].createElement(_grommet.Form, {
        value: api.formValue,
        onChange: function onChange(nextValue) {
          return api.setFormValue(nextValue);
        },
        validate: "submit"
      }, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
        htmlFor: "wizard-email",
        label: "Email",
        name: "email",
        required: true,
        validate: validateEmail,
        error: emailError
      }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
        id: "wizard-email",
        name: "email",
        placeholder: "you@example.com"
      })));
    }
  }, {
    id: 'password',
    title: 'Password',
    description: 'Choose a password.',
    validate: function validate(value) {
      return validatePassword(value.password) ? 'Fix the issues to continue' : true;
    },
    render: function render(step, api) {
      var passwordError = api.validationError && validatePassword(api.formValue.password);
      return /*#__PURE__*/_react["default"].createElement(_grommet.Form, {
        value: api.formValue,
        onChange: function onChange(nextValue) {
          return api.setFormValue(nextValue);
        },
        validate: "change"
      }, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
        htmlFor: "wizard-password",
        label: "Password",
        name: "password",
        required: true,
        validate: validatePassword,
        error: passwordError
      }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
        id: "wizard-password",
        name: "password",
        type: "password",
        placeholder: "password"
      })));
    }
  }, {
    id: 'confirm',
    title: 'Confirm',
    description: 'Ready to submit.',
    render: function render(step, api) {
      return /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "Confirm sign-up for ", api.formValue.email, ".");
    }
  }];
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true
  }, /*#__PURE__*/_react["default"].createElement(_Wizard.Wizard, {
    "aria-label": "Sign up",
    title: "Create your account",
    showProgress: "vertical",
    steps: steps,
    defaultValue: {
      email: '',
      password: ''
    },
    onComplete: function onComplete(_ref) {
      var value = _ref.value;
      return setResult({
        status: 'complete',
        value: value
      });
    }
  }), result && /*#__PURE__*/_react["default"].createElement(_grommet.Notification, {
    toast: {
      position: 'top'
    },
    status: "normal",
    title: "Wizard complete",
    message: "Account created for " + result.value.email + ".",
    onClose: function onClose() {
      return setResult(null);
    }
  }));
};
Validation.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Layout/Wizard/Validation'
};