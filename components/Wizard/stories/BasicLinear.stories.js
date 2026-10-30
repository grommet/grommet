"use strict";

exports.__esModule = true;
exports["default"] = exports.BasicLinear = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _Wizard = require("../Wizard");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var steps = [{
  id: 'account',
  title: 'Account',
  description: 'Tell us about your account.',
  render: function render() {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      gap: "small"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "Enter an email to continue."), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      label: "Email",
      name: "email",
      htmlFor: "email-field",
      required: true
    }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
      id: "email-field",
      placeholder: "you@example.com",
      name: "email"
    })));
  }
}, {
  id: 'profile',
  title: 'Profile',
  description: 'Fill in your profile details.',
  render: function render() {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "Placeholder profile form for the second step.");
  }
}, {
  id: 'review',
  title: 'Review',
  description: 'Review and finish.',
  render: function render(step, api) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "Ready to submit for ", api.formValue.email || 'unknown user', ".");
  }
}];
var BasicLinear = exports.BasicLinear = function BasicLinear() {
  var _useState = (0, _react.useState)(false),
    complete = _useState[0],
    setComplete = _useState[1];
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true
  }, /*#__PURE__*/_react["default"].createElement(_Wizard.Wizard, {
    "aria-label": "Onboarding",
    title: "Set up your account",
    steps: steps,
    onComplete: function onComplete() {
      return setComplete(true);
    }
  }), complete && /*#__PURE__*/_react["default"].createElement(_grommet.Notification, {
    toast: {
      position: 'top'
    },
    status: "normal",
    title: "Wizard complete",
    onClose: function onClose() {
      return setComplete(false);
    }
  }));
};
BasicLinear.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Layout/Wizard/Basic Linear'
};