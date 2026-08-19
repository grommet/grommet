"use strict";

exports.__esModule = true;
exports["default"] = exports.NestedSubSteps = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _Wizard = require("../Wizard");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

// Nested wizard with sub-steps under a parent group. Parent is never a
// navigation target; child steps are visited in order.
var steps = [{
  id: 'setup',
  title: 'Setup',
  children: [{
    id: 'setup-account',
    title: 'Account',
    description: 'Create an account.',
    render: function render() {
      return /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "Account form here.");
    }
  }, {
    id: 'setup-profile',
    title: 'Profile',
    description: 'Fill in your profile.',
    render: function render() {
      return /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "Profile form here.");
    }
  }]
}, {
  id: 'billing',
  title: 'Billing',
  description: 'Set up billing.',
  render: function render() {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "Billing form here.");
  }
}, {
  id: 'review',
  title: 'Review',
  description: 'Review and submit.',
  render: function render() {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "Review summary here.");
  }
}];
var NestedSubSteps = exports.NestedSubSteps = function NestedSubSteps() {
  var _useState = (0, _react.useState)(null),
    result = _useState[0],
    setResult = _useState[1];
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true
  }, /*#__PURE__*/_react["default"].createElement(_Wizard.Wizard, {
    "aria-label": "Nested wizard",
    title: "Set up your organization",
    showProgress: "vertical",
    steps: steps,
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
    message: result.value && Object.keys(result.value).length > 0 ? "Completed: " + JSON.stringify(result.value) : undefined,
    onClose: function onClose() {
      return setResult(null);
    }
  }));
};
NestedSubSteps.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Layout/Wizard/Nested Sub-Steps'
};