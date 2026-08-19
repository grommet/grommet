"use strict";

exports.__esModule = true;
exports["default"] = exports.Modal = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _grommetIcons = require("grommet-icons");
var _Wizard = require("../Wizard");
var _WizardFooter = require("../WizardFooter");
var _WizardContext = require("../WizardContext");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

// Wizard inside a modal Layer. `onCancel` wires the header X to the
// parent-owned close handler. A custom footer composed via <WizardFooter>
// children preserves the themed shell while omitting the Cancel button.
var NoCancelFooter = function NoCancelFooter() {
  var _useWizard = (0, _WizardContext.useWizard)(),
    currentStepIndex = _useWizard.currentStepIndex,
    totalSteps = _useWizard.totalSteps,
    canGoNext = _useWizard.canGoNext,
    previous = _useWizard.previous,
    next = _useWizard.next,
    complete = _useWizard.complete;
  var isFirstStep = currentStepIndex <= 0;
  var isLastStep = currentStepIndex >= totalSteps - 1;
  return /*#__PURE__*/_react["default"].createElement(_WizardFooter.WizardFooter, null, !isFirstStep && /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "Previous",
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.FormPrevious, {
      "aria-hidden": "true"
    }),
    onClick: previous
  }), isLastStep ? /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "Complete",
    primary: true,
    disabled: !canGoNext,
    onClick: complete
  }) : /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "Next",
    primary: true,
    reverse: true,
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.FormNext, {
      "aria-hidden": "true"
    }),
    disabled: !canGoNext,
    onClick: next
  }));
};
var steps = [{
  id: 'details',
  title: 'Details',
  description: 'Enter details for the new resource.',
  render: function render() {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "Describe the resource you are creating.");
  }
}, {
  id: 'configure',
  title: 'Configure',
  description: 'Configure options for this resource.',
  render: function render() {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "Pick configuration options.");
  }
}, {
  id: 'review',
  title: 'Review',
  description: 'Review and finish.',
  render: function render() {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "Confirm and create the resource.");
  }
}];
var Modal = exports.Modal = function Modal() {
  var _useState = (0, _react.useState)(false),
    open = _useState[0],
    setOpen = _useState[1];
  var _useState2 = (0, _react.useState)(null),
    result = _useState2[0],
    setResult = _useState2[1];
  var _useState3 = (0, _react.useState)(0),
    resetKey = _useState3[0],
    setResetKey = _useState3[1];
  var close = function close() {
    setOpen(false);
    setResetKey(function (key) {
      return key + 1;
    });
  };
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    pad: "medium",
    gap: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "start"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    primary: true,
    label: "Open wizard",
    onClick: function onClick() {
      return setOpen(true);
    }
  })), open &&
  /*#__PURE__*/
  // Composed sizing: the wrapping Layer + Box choose the modal's
  // dimensions. Swap these values to make the wizard narrower,
  // wider, or full-screen — the Wizard fills whatever it's placed in.
  _react["default"].createElement(_grommet.Layer, {
    modal: true,
    position: "center",
    onEsc: close,
    onClickOutside: close
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    width: "xlarge",
    height: "large"
  }, /*#__PURE__*/_react["default"].createElement(_Wizard.Wizard, {
    key: resetKey,
    "aria-label": "Modal wizard",
    title: "Create resource",
    showProgress: "horizontal",
    steps: steps,
    footer: /*#__PURE__*/_react["default"].createElement(NoCancelFooter, null),
    onComplete: function onComplete(_ref) {
      var value = _ref.value;
      setResult({
        status: 'complete',
        value: value
      });
      close();
    },
    onCancel: close
  }))), result && /*#__PURE__*/_react["default"].createElement(_grommet.Notification, {
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
Modal.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Layout/Wizard/Modal'
};