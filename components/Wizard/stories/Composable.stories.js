"use strict";

exports.__esModule = true;
exports["default"] = exports.Composable = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _Wizard = require("../Wizard");
var _WizardHeader = require("../WizardHeader");
var _WizardProgress = require("../WizardProgress");
var _WizardContent = require("../WizardContent");
var _WizardFooter = require("../WizardFooter");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

// Composable wizard: consumers assemble the layout from sub-components.
// Passing `children` bypasses the default layout — each sub-component
// reads from WizardContext, so no props need to be threaded through.
// Insert <WizardStepHeader /> between progress and content to show the
// current step's title and description.
var steps = [{
  id: 'account',
  title: 'Account',
  description: 'Tell us about your account.',
  render: function render() {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "Placeholder account form.");
  }
}, {
  id: 'profile',
  title: 'Profile',
  description: 'Fill in your profile details.',
  render: function render() {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "Placeholder profile form.");
  }
}, {
  id: 'review',
  title: 'Review',
  description: 'Review and finish.',
  render: function render() {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "Ready to submit.");
  }
}];
var Composable = exports.Composable = function Composable() {
  var _useState = (0, _react.useState)(false),
    complete = _useState[0],
    setComplete = _useState[1];
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true
  }, /*#__PURE__*/_react["default"].createElement(_Wizard.Wizard, {
    "aria-label": "Composable wizard",
    showProgress: "horizontal",
    steps: steps,
    onComplete: function onComplete() {
      return setComplete(true);
    }
  }, /*#__PURE__*/_react["default"].createElement(_WizardHeader.WizardHeader, null, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: 2,
    size: "small",
    margin: "none"
  }, "Set up your account")), /*#__PURE__*/_react["default"].createElement(_WizardProgress.WizardProgress, null), /*#__PURE__*/_react["default"].createElement(_WizardContent.WizardContent, {
    background: "light-3"
  }), /*#__PURE__*/_react["default"].createElement(_WizardFooter.WizardFooter, null)), complete && /*#__PURE__*/_react["default"].createElement(_grommet.Notification, {
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
Composable.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Layout/Wizard/Composable'
};