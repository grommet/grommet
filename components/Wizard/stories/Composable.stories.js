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
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
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