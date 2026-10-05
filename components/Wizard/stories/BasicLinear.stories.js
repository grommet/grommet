"use strict";

exports.__esModule = true;
exports["default"] = exports.BasicLinear = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _Wizard = require("../Wizard");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
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