"use strict";

exports.__esModule = true;
exports["default"] = exports.NestedSubSteps = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _Stepper = require("../Stepper");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var NestedSubSteps = exports.NestedSubSteps = function NestedSubSteps() {
  var _steps$find;
  var _useState = (0, _react.useState)('email'),
    currentStep = _useState[0],
    setCurrentStep = _useState[1];
  var steps = [{
    id: 'account',
    title: 'Account Setup',
    children: [{
      id: 'email',
      title: 'Email',
      status: 'completed'
    }, {
      id: 'password',
      title: 'Password',
      status: 'pending'
    }]
  }, {
    id: 'profile',
    title: 'Profile Setup',
    children: [{
      id: 'name',
      title: 'Name',
      status: 'pending'
    }, {
      id: 'photo',
      title: 'Photo',
      status: 'error',
      errorMessage: 'Please upload a valid photo.'
    }]
  }, {
    id: 'confirm',
    title: 'Confirm',
    status: 'pending'
  }];
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      pad: "large",
      gap: "medium"
    }, /*#__PURE__*/_react["default"].createElement(_Stepper.Stepper, {
      steps: steps,
      currentStep: currentStep,
      direction: "vertical",
      "aria-label": "Account setup progress",
      onStepClick: function onStepClick(id) {
        return setCurrentStep(id);
      }
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Parent:", ' ', ((_steps$find = steps.find(function (s) {
      var _s$children;
      return (_s$children = s.children) == null ? void 0 : _s$children.some(function (c) {
        return c.id === currentStep;
      });
    })) == null ? void 0 : _steps$find.title) || 'None'), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Current Step: ", currentStep))
    // </Grommet>
  );
};
var _default = exports["default"] = {
  title: 'Visualizations/Stepper/Nested Sub-Steps'
};