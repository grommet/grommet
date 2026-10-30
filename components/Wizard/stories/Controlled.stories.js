"use strict";

exports.__esModule = true;
exports["default"] = exports.Controlled = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _Wizard = require("../Wizard");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

// Controlled Wizard: parent owns currentStep and reacts to onStepChange.
var steps = [{
  id: 'one',
  title: 'One',
  render: function render() {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "Step one.");
  }
}, {
  id: 'two',
  title: 'Two',
  skippable: true,
  render: function render() {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "Step two.");
  }
}, {
  id: 'three',
  title: 'Three',
  render: function render() {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "Step three.");
  }
}];
var Controlled = exports.Controlled = function Controlled() {
  var _useState = (0, _react.useState)('one'),
    currentStep = _useState[0],
    setCurrentStep = _useState[1];
  var _useState2 = (0, _react.useState)(null),
    result = _useState2[0],
    setResult = _useState2[1];
  var _useState3 = (0, _react.useState)(0),
    resetKey = _useState3[0],
    setResetKey = _useState3[1];
  var _useState4 = (0, _react.useState)(false),
    confirmCancel = _useState4[0],
    setConfirmCancel = _useState4[1];
  var _useState5 = (0, _react.useState)(true),
    wizardOpen = _useState5[0],
    setWizardOpen = _useState5[1];
  var handleCancel = function handleCancel() {
    setConfirmCancel(true);
  };
  var confirmCancelYes = function confirmCancelYes() {
    setConfirmCancel(false);
    setResult(null);
    setCurrentStep('one');
    setResetKey(function (key) {
      return key + 1;
    });
    setWizardOpen(false);
  };
  var confirmCancelNo = function confirmCancelNo() {
    setConfirmCancel(false);
  };
  var reopenWizard = function reopenWizard() {
    setWizardOpen(true);
  };
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true
  }, wizardOpen ? /*#__PURE__*/_react["default"].createElement(_Wizard.Wizard, {
    key: resetKey,
    "aria-label": "Controlled wizard",
    title: "Configure workspace",
    showProgress: "horizontal",
    steps: steps,
    currentStep: currentStep,
    onStepChange: function onStepChange(event) {
      if (event.phase === 'navigated' && event.to) {
        setCurrentStep(event.to);
      }
    },
    onComplete: function onComplete(_ref) {
      var value = _ref.value;
      return setResult({
        status: 'complete',
        value: value
      });
    },
    onCancel: handleCancel
  }) : /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "medium",
    align: "start"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    primary: true,
    label: "Reopen wizard",
    onClick: reopenWizard
  })), confirmCancel && /*#__PURE__*/_react["default"].createElement(_grommet.Layer, {
    modal: true,
    position: "center",
    onEsc: confirmCancelNo,
    onClickOutside: confirmCancelNo
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "medium",
    gap: "medium",
    width: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: 3,
    margin: "none"
  }, "Cancel wizard?"), /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, {
    margin: "none"
  }, "Are you sure you want to cancel? Your progress will be lost."), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    justify: "end",
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "Keep editing",
    onClick: confirmCancelNo
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "Yes, cancel",
    primary: true,
    color: "status-critical",
    onClick: confirmCancelYes
  })))), result && /*#__PURE__*/_react["default"].createElement(_grommet.Notification, {
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
Controlled.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Layout/Wizard/Controlled'
};