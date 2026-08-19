"use strict";

exports.__esModule = true;
exports["default"] = exports.NestedSubSteps = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _Stepper = require("../Stepper");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
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